import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import SelectListGroup from '../common/SelectListGroup'
import InputGroup from '../common/InputGroup'
import { createProfile, getCurrentProfile } from '../../actions/profileActions'
import isEmpty from '../../validation/is-empty'

class EditProfile extends Component {

    constructor (props) {
        super(props)
        this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        this.props.getCurrentProfile()
    }

    componentWillReceiveProps (nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
        if(nextProps.profile.profile) {
            const profile = nextProps.profile.profile
            
            // Bring skills array back to comma separated value 

            const skillsCSV = profile.skills.join(',')
            
            // If profile field doesn't exist, make empty string 

            profile.company = !isEmpty(profile.company) ? profile.company : ''
            profile.website = !isEmpty(profile.website) ? profile.website : ''
            profile.location = !isEmpty(profile.location) ? profile.location : ''
            profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : ''
            profile.bio = !isEmpty(profile.bio) ? profile.bio : ''
            profile.social = !isEmpty(profile.social) ? profile.social : {}
            profile.social.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : ''
            profile.social.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : ''
            profile.social.linkedin = !isEmpty(profile.social.linkedin ) ? profile.social.linkedin  : ''
            profile.social.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube: ''
            profile.social.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : ''

            // set component fields state
            this.setState({
                handle: profile.handle,
                company: profile.company,
                website: profile.website,
                location: profile.location,
                status: profile.status,
                skills: skillsCSV,
                githubusername: profile.githubusername,
                bio: profile.bio,
                twitter: profile.social.twitter,
                facebook: profile.social.facebook,
                linkedin: profile.social.linkedin,
                youtube: profile.social.youtube,
                instagram: profile.social.instagram
            })

        }
    }

    onSubmit (e) {
        e.preventDefault()
        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram,
        }
        this.props.createProfile(profileData, this.props.history)
    }

    onChange (e) {
        this.setState({[e.target.name]: e.target.value})
    }
 
    render() {
        const { errors, displaySocialInputs } = this.state

        let socialInputs 

        if (displaySocialInputs) {
            socialInputs = (
                <div>
                    <InputGroup 
                        placeholder='Twitter Profile URL'
                        name='twitter'
                        icon='fab fa-twitter'
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                    />
                    <InputGroup 
                        placeholder='Facebook Page URL'
                        name='facebook'
                        icon='fab fa-facebook'
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                    />
                    <InputGroup 
                        placeholder='LinkedinProfile URL'
                        name='linkedin'
                        icon='fab fa-linkedin'
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin}
                    />
                    <InputGroup 
                        placeholder='Youtube Profile URL'
                        name='youtube'
                        icon='fab fa-youtuber'
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={errors.youtube}
                    />
                    <InputGroup 
                        placeholder='Instagram Profile URL'
                        name='instagram'
                        icon='fab fa-instagram'
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                    />
                </div>
            )
        }

        // Select options for status 
        const options = [
            {label: '*Select Professional Status', value: 0},
            {label: 'Developer', value: 'Devloper'},
            {label: 'Entry-Level Developer', value: 'Entry-Level Devloper'},
            {label: 'Mid-Level Developer', value: 'Mid-Level Devloper'},
            {label: 'Senior Developer', value: 'Senior Devloper'},
            {label: 'Student', value: 'Student'},
            {label: 'Self-Learning', value: 'Self-Learning'},
            {label: 'Instructor or Teacher', value: 'Instructor or Teacher'},
            {label: 'Intern', value: 'Intern'},
            {label: 'Other', value: 'Other'}
        ]
        return (
            <div className='createProfile'>
                <div className="containter">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to='/dashboard' className='btn btn-light'>
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center">
                                Edit Profile
                            </h1>
                            <small className="d-block pb-3">
                                * equal to required fields 
                            </small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup 
                                    placeholder="* Profile handle"
                                    name='handle'
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    info='A unique handle for your profile URL, such as your full name,company name, or a nickname.'
                                />
                                <SelectListGroup
                                     placeholder="Status"
                                     name='status'
                                     value={this.state.status}
                                     onChange={this.onChange}
                                     error={errors.status}
                                     options={options}
                                     info='Give us an idea of where your are in your career.'
                                />
                                <TextFieldGroup 
                                    placeholder="Company"
                                    name='company'
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                    info='This can be your own company or one you work for.'
                                />
                                <TextFieldGroup 
                                    placeholder="Website"
                                    name='website'
                                    value={this.state.website}
                                    onChange={this.onChange}
                                    error={errors.website}
                                    info='Your own website or the website of the company where you work.'
                                />
                                <TextFieldGroup 
                                    placeholder="Location"
                                    name='location'
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                    info='City and state suggested (eg. Boston, MA).'
                                />
                                 <TextFieldGroup 
                                    placeholder='* Skills'
                                    name='skills'
                                    value={this.state.skills}
                                    onChange={this.onChange}
                                    error={errors.skills}
                                    info='Please use comma separated values (eg. HTML, CSS, PHP, SQL)'
                                />
                                <TextFieldGroup 
                                    placeholder='Github Username'
                                    name='githubusername'
                                    value={this.state.githubusername}
                                    onChange={this.onChange}
                                    error={errors.githubusername}
                                    info='If you want your latest repos and a Github link, add your username.'
                                />
                                <TextAreaFieldGroup 
                                    placeholder='Short Bio'
                                    name='bio'
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    error={errors.bio}
                                    info='Tell us a little about yourself.'
                                />
                                <div className="mb-3">
                                    <button 
                                        type='button'
                                        className="btn btn-light"
                                        onClick={() => {
                                            this.setState(prevState => ({
                                                displaySocialInputs: !prevState.displaySocialInputs
                                            }))
                                        }}
                                    >
                                    Add Social Network Links 
                                    </button>
                                    <span className="text-muted">Optional</span>
                                </div>
                                { socialInputs }
                                <input type='submit' value='Submit' className='btn btn-info btn-block mt-4'/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    )
  }
}

EditProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile))