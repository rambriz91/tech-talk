const newPostHandler = async () => {
  document.location.replace('/post');
};

document
  .querySelector('#new-post-btn')
  .addEventListener('click', newPostHandler);
