const commentInput = document.querySelector('#comment-input');
const commentBtn = document.querySelector('#comment-btn');
const postIdInput = document.querySelector('#post-id');
// const updateBtn = document.querySelector('#update-btn');
const deleteBtn = document.querySelector('#delete-btn');

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

const deleteBtnHandler = async () => {
  const postId = postIdInput.value;
  const response = await fetch(`/api/post/delete/${postId}`, {
    method: 'DELETE',
    body: JSON.stringify(),
    headers: { 'Content-type': 'application/json' },
  });
  if (response.ok) {
    document.location.replace('/dashboard');
  }
};

// const updateBtnHandler = async () => {
//   const postId = postIdInput.value;
//   const response = await fetch(`/api/post/update/${postId}`, {
//     method: 'UPDATE',
//     body: JSON.stringify(),
//     headers: { 'Content-type': 'application/json' },
//   });
//   if (response.ok) {
//     document.location.replace('/dashboard');
//   }
// };

deleteBtn.addEventListener('click', deleteBtnHandler);
commentBtn.addEventListener('click', commentHandler);
