document.addEventListener('DOMContentLoaded', function () {
  const sideMenu = document.querySelector('.side-menu');
  const logo = document.querySelector('.logo img');
  const appName = document.querySelector('.app-name');
  const menuOptions = document.querySelector('.menu-options');
  const mainContent = document.querySelector('.main-content'); // Select the main content

  // Function to toggle side menu
  function toggleSideMenu() {
      sideMenu.classList.toggle('slim');

      // Hide/show app name and menu options based on the slim state
      if (sideMenu.classList.contains('slim')) {
          appName.style.display = 'none'; // Hide app name
          menuOptions.style.display = 'none'; // Hide menu options
          logo.style.margin = '0'; // Adjust logo margin if needed
          mainContent.classList.add('slim'); // Add slim class to main content
      } else {
          appName.style.display = 'block'; // Show app name
          menuOptions.style.display = 'block'; // Show menu options
          mainContent.classList.remove('slim'); // Remove slim class from main content
      }
  }

  // Add click event to the logo to trigger the toggle function
  logo.addEventListener('click', toggleSideMenu);
});

// For dashboard monitor

