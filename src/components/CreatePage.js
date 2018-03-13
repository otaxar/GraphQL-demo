import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql} from 'react-apollo'
import Modal from 'react-modal'
import modalStyle from '../constants/modalStyle'
import gql from 'graphql-tag'

// This component deisplays the Create dialog
class CreatePage extends React.Component {

  state = {
    description: '',
    imageUrl: '',
  }

  render() {
    return (
      <Modal
        isOpen
        contentLabel='Create Post'
        style={modalStyle}
        onRequestClose={this.props.history.goBack}
      >
        <div className='close move-close fixed right-0 top-0 pointer'
             onClick={this.props.history.goBack}
        >
            <img src={require('../assets/close.svg')} alt='' />
        </div>


        <div className='pa4 flex justify-center bg-white'>
          <div style={{maxWidth: 460}} className=''>

            <span> Please enter the details </span>

            {this.state.imageUrl &&
              <img
                src={this.state.imageUrl}
                alt=''
                className='w-100 mv3'
              />}

            <input
              className='w-100 pa3 mv2'
              value={this.state.imageUrl}
              placeholder='Image Url'
              onChange={e => this.setState({imageUrl: e.target.value})}
              autoFocus
            />

            <input
              className='w-100 pa3 mv2'
              value={this.state.description}
              placeholder='Description'
              onChange={e => this.setState({description: e.target.value})}
            />

            {this.state.description &&
              this.state.imageUrl &&

            <button
                className='pa3 bg-black-10 bn dim ttu pointer'
                onClick={this.handlePost}
              >
                Post
            </button>}
          </div>
        </div>

      </Modal>
    )
  }

  // Post action handler
  handlePost = async () => {
    const {description, imageUrl} = this.state
    await this.props.createPostMutation({variables: {description, imageUrl}})
    this.props.history.replace('/')
  }

}

// graphql mutation
const CREATE_POST_MUTATION = gql`
  mutation CreatePostMutation($description: String!, $imageUrl: String!) {
    createPost(description: $description, imageUrl: $imageUrl) {
      id
      description
      imageUrl
    }
  }
`

const CreatePageWithMutation = graphql(CREATE_POST_MUTATION, {name: 'createPostMutation'})(CreatePage)
export default withRouter(CreatePageWithMutation)
