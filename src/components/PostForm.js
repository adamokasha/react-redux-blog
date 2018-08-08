import React from 'react';

export class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: props.post ? props.post._id : '',
      title: props.post ? props.post.title : '',
      createdAt: props.post ? props.post.createdAt : Date.now(),
      category: props.post ? props.post.category : '',
      body: props.post ? props.post.body : '',
      errors: null
    }
  }
  onTitleChange = (e) => {
    this.setState({title: e.target.value})
  } 
  onCategoryChange = (e) => {
    this.setState({category: e.target.value})
  } 
  onBodyChange = (e) => {
    this.setState({body: e.target.value})
  } 
  renderErrors = () => {
    const {errors} = this.state;
    if (errors) {
      return this.state.errors.map((error) => <li>{error}</li>);
    }
  }
  onSubmit = (e) => {
    e.preventDefault();

    const {title, category, body } = this.state;
    const errors = [];
    if (title.length < 4) {
      errors.push('Title should have at least 4 characters.')
    }
    if (category.length < 4) {
      errors.push('Category should have at least 4 characters')
    }
    if (body.length < 24) {
      errors.push('The post body should have at least 24 characters')
    }

    if (errors.length >= 1) {
      this.setState({errors});
    } else {
      const post = this.state;
      this.props.onSubmit(post);  
    }
  }
  render() {
    return (
      <div>
        <ul className="error-list">{this.renderErrors()}</ul>
        <form onSubmit={this.onSubmit}>
          <label>Title</label>
          <input 
          type="text" 
          onChange={this.onTitleChange}
          value={this.state.title}
          maxLength={60}
          />
          <label>Category</label>
          <input
          type="text"
          onChange={this.onCategoryChange}
          value={this.state.category}
          maxLength={16}
          />     
          <label>Body</label>
          <textarea
          onChange={this.onBodyChange}
          value={this.state.body}
          maxLength={12000}
          />
          <button>Save Post</button>
        </form>
      </div>
    )
  }
}

export default PostForm;