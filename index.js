"use strict";   
const hamburgerEl = document.getElementById('hamburger');
const sideNav = document.getElementById('sideNav');
const closeBtn = document.getElementById('close');


hamburgerEl.addEventListener('click', toggleMenu);   // Add event listener to the hamburger icon
function toggleMenu() {
  if (sideNav.style.display === "none" || sideNav.style.display === "") {
    sideNav.style.display = "flex"; // Show the menu
  } else {
    sideNav.style.display = "none"; // Hide the menu
  }
}

closeBtn.addEventListener('click', closeMenu);
function closeMenu() {
    sideNav.style.display = "none"; // Hide the menu
    }
                                                  // end of hiding and showing the menu

                                                    