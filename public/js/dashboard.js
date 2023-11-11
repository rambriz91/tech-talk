const newPostHandler = async () => {
  document.location.replace('/newpost');
};

document
  .querySelector('#new-post-btn')
  .addEventListener('click', newPostHandler);
