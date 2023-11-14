const newPostHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#title-input').value.trim();
  const content = document.querySelector('#content-input').value.trim();

  if (title && content) {
    const response = await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('#post-form').addEventListener('submit', newPostHandler);
