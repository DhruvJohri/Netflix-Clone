(() => {
  const STORAGE_KEY = 'netflix_profiles';
  const MAX_PROFILES = 6;

  // Avatars to randomly assign
  const avatars = [
    'https://randomuser.me/api/portraits/lego/1.jpg',
    'https://randomuser.me/api/portraits/lego/2.jpg',
    'https://randomuser.me/api/portraits/lego/3.jpg',
    'https://randomuser.me/api/portraits/lego/4.jpg',
    'https://randomuser.me/api/portraits/lego/5.jpg',
    'https://randomuser.me/api/portraits/lego/6.jpg',
    'https://randomuser.me/api/portraits/women/21.jpg',
    'https://randomuser.me/api/portraits/men/22.jpg'
  ];

  // Get profiles from localStorage or create default
  function getProfiles() {
    let profiles = [];
    try {
      profiles = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      profiles = [];
    }
    if (!Array.isArray(profiles) || profiles.length === 0) {
      profiles = [
        { id: generateId(), name: 'Primary', avatar: avatars[0] }
      ];
      saveProfiles(profiles);
    }
    return profiles;
  }

  // Save profiles to localStorage
  function saveProfiles(profiles) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
  }

  // Generate unique ID for profiles
  function generateId() {
    return 'p' + Date.now().toString(16) + (Math.random() * 1e8 | 0).toString(16);
  }

  // Create a profile card DOM element
  function createProfileCard(profile) {
    const card = document.createElement('div');
    card.className = 'profile-card';
    card.setAttribute('role', 'listitem');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Profile ${profile.name}`);
    card.dataset.id = profile.id;

    // Avatar container
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'avatar';

    // Avatar image
    const img = document.createElement('img');
    img.src = profile.avatar;
    img.alt = `${profile.name} avatar`;
    avatarDiv.appendChild(img);

    // Delete button if more than one profile exists
    if (getProfiles().length > 1) {
      const delBtn = document.createElement('button');
      delBtn.className = 'delete-btn';
      delBtn.setAttribute('aria-label', `Delete profile ${profile.name}`);
      delBtn.title = 'Delete profile';
      delBtn.innerHTML = '<i class="fas fa-trash"></i>';
      delBtn.addEventListener('click', e => {
        e.stopPropagation();
        if (confirm(`Delete profile "${profile.name}"?`)) {
          deleteProfile(profile.id);
        }
      });
      avatarDiv.appendChild(delBtn);
    }

    card.appendChild(avatarDiv);

    // Profile name label
    const nameDiv = document.createElement('div');
    nameDiv.className = 'profile-name';
    nameDiv.textContent = profile.name;
    card.appendChild(nameDiv);

    // Select profile on click or key press
    card.addEventListener('click', () => selectProfile(profile));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectProfile(profile);
      }
    });

    return card;
  }

  // Render all profiles and the Add New Profile button (if allowed)
  function renderProfiles() {
    const container = document.getElementById('profiles-grid');
    container.innerHTML = '';

    let profiles = getProfiles();

    profiles.forEach(profile => {
      const card = createProfileCard(profile);
      container.appendChild(card);
    });

    // Add New Profile card if below limit
    if (profiles.length < MAX_PROFILES) {
      const addCard = document.createElement('div');
      addCard.className = 'profile-card add-profile-card';
      addCard.setAttribute('tabindex', '0');
      addCard.setAttribute('role', 'button');
      addCard.setAttribute('aria-label', 'Add new profile');
      addCard.innerHTML = '<span>+</span>';

      // Label below the plus sign
      const label = document.createElement('div');
      label.className = 'add-label';
      label.textContent = 'Add Profile';
      addCard.appendChild(label);

      // Show add profile form on click or Enter/Space key
      addCard.addEventListener('click', () => showAddForm());
      addCard.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          showAddForm();
        }
      });

      container.appendChild(addCard);
    }
  }

  // Show the add profile form below the grid
  function showAddForm() {
    const formContainer = document.getElementById('add-profile-form-container');
    if (formContainer.children.length) return; // Only one form at a time

    const form = document.createElement('form');
    form.className = 'add-form';
    form.setAttribute('aria-label', 'Add new profile form');
    form.innerHTML = `
      <input type="text" name="profileName" minlength="1" maxlength="18"
        placeholder="Profile Name" required autocomplete="off" aria-required="true" autofocus />
      <button type="submit">Save</button>
      <button type="button" class="cancel-btn">Cancel</button>
    `;

    // Cancel button handler
    form.querySelector('.cancel-btn').addEventListener('click', e => {
      e.preventDefault();
      formContainer.innerHTML = '';
    });

    // Form submission handler
    form.addEventListener('submit', e => {
      e.preventDefault();
      const nameInput = form.elements['profileName'];
      const name = nameInput.value.trim();

      if (!name) return;

      if (isDuplicateName(name)) {
        alert('Profile name already exists. Choose another name.');
        nameInput.focus();
        return;
      }

      addProfile(name);
      formContainer.innerHTML = '';
    });

    formContainer.appendChild(form);
    form.elements['profileName'].focus();
  }

  // Check if profile name already exists (case-insensitive)
  function isDuplicateName(name) {
    const profiles = getProfiles();
    return profiles.some(p => p.name.toLowerCase() === name.toLowerCase());
  }

  // Add new profile
  function addProfile(name) {
    let profiles = getProfiles();
    if (profiles.length >= MAX_PROFILES) {
      alert(`Maximum of ${MAX_PROFILES} profiles reached.`);
      return;
    }
    const newProfile = {
      id: generateId(),
      name: name.substring(0, 18),
      avatar: avatars[Math.floor(Math.random() * avatars.length)]
    };
    profiles.push(newProfile);
    saveProfiles(profiles);
    renderProfiles();
  }

  // Delete profile by ID (cannot delete last profile)
  function deleteProfile(id) {
    let profiles = getProfiles();
    if (profiles.length <= 1) {
      alert('You must have at least one profile.');
      return;
    }
    profiles = profiles.filter(p => p.id !== id);
    saveProfiles(profiles);
    renderProfiles();
  }

  // Select a profile and navigate to dashboard
  function selectProfile(profile) {
    localStorage.setItem('selectedProfile', profile.name);
    window.location.href = 'dashboard.html';
  }

  // Initialize on DOM ready
  function init() {
    renderProfiles();
  }

  document.addEventListener('DOMContentLoaded', init);

  // Expose functions for testing/debug if needed
  window.__ProfileSelection = {
    addProfile,
    deleteProfile,
    getProfiles,
    selectProfile
  };
})();
