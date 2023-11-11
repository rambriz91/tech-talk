const logout = async () => {
  // Make a POST request to destroy the session on the back end
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    // If successfully logged out, redirect to the login page
    document.location.replace('/login');
  } else {
    alert(response.statusText);
  }
};

const dashboardHandler = async () => {
  document.location.replace('/dashboard');
};

const homeBtnHandler = async () => {
  document.location.replace('/');
};

document.querySelector('#home').addEventListener('click', homeBtnHandler);

document
  .querySelector('#dashboard')
  .addEventListener('click', dashboardHandler);
document.querySelector('#logout').addEventListener('click', logout);
