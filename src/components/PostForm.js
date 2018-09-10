import React from 'react';
import ErrorMessages from './ErrorMessages';

export class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: props.post ? props.post._id : '',
      title: props.post ? props.post.title : '',
      createdAt: props.post ? props.post.createdAt : Date.now(),
      category: props.post ? props.post.category : '',
      mainImage: props.post ? props.post.mainImage : '',
      thumbnail: props.post ? props.post.thumbnail : '',
      body: props.post ? props.post.body : '',
      errors: ''
    };
  }
  onTitleChange = e => {
    this.setState({ title: e.target.value });
  };
  onCategoryChange = e => {
    this.setState({ category: e.target.value });
  };
  onBodyChange = e => {
    this.setState({ body: e.target.value });
  };
  onMainImageChange = e => {
    this.setState({ mainImage: e.target.value });
  };
  onThumbnailChange = e => {
    this.setState({ thumbnail: e.target.value });
  };
  renderErrors = () => {
    const { errors } = this.state;
    if (errors) {
      return <ErrorMessages errors={errors} />;
    }
  };
  onSubmit = e => {
    e.preventDefault();

    const { title, category, body } = this.state;
    const errors = [];
    if (title.length < 4) {
      errors.push('Title should have at least 4 characters.');
    }
    if (category.length < 4) {
      errors.push('Category should have at least 4 characters');
    }
    if (body.length < 24) {
      errors.push('The post body should have at least 24 characters');
    }

    if (errors.length >= 1) {
      this.setState({ errors });
    } else {
      const post = this.state;
      this.props.onSubmit(post);
    }
  };
  render() {
    return (
      <div>
        {this.renderErrors()}
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              onChange={this.onTitleChange}
              value={this.state.title}
              maxLength={60}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              className="form-control"
              name="category"
              onChange={this.onCategoryChange}
              value={this.state.category}
              maxLength={16}
            />
          </div>
          <div className="form-group">
            <label htmlFor="mainimage">Main Image (Optional)</label>
            <input
              type="text"
              className="form-control"
              name="mainimage"
              onChange={this.onMainImageChange}
              value={this.state.mainImage}
              placeholder="Enter URL for the main post view image"
            />
          </div>
          <div className="form-group">
            <label htmlFor="thumbnail">Image Thumbnail (Optional)</label>
            <input
              type="text"
              className="form-control"
              name="thumbnail"
              onChange={this.onThumbnailChange}
              value={this.state.thumbnail}
              placeholder="Enter URL for the dashboard card image"
            />
          </div>
          <div className="form-group">
            <label htmlFor="body">Body</label>
            <textarea
              name="body"
              className="form-control"
              onChange={this.onBodyChange}
              value={this.state.body}
              maxLength={12000}
              rows="10"
            />
          </div>
          <button className="btn btn-primary btn-block">Save Post</button>
        </form>
      </div>
    );
  }
}

export default PostForm;
