const commentInput = document.querySelector('#comment-input');
const commentBtn = document.querySelector('#comment-btn');
const postIdInput = document.querySelector('#post-id');

const commentHandler = async (event) => {
  event.preventDefault();
  const comment = commentInput.value.trim();
  const postId = postIdInput.value;

  if (comment) {
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ comment, postId }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

commentBtn.addEventListener('click', commentHandler);
