// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const themeSelect = document.getElementById('theme-select');
    const listStyleSelect = document.getElementById('list-style-select');
    const listContainer = document.getElementById('list-container');
    const body = document.body;

    // List items
    const listItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

    // Function to apply the theme
    const applyTheme = (theme) => {
        // Remove previous theme classes
        body.classList.remove('theme-default', 'theme-dark', 'theme-light');
        // Add new theme class
        body.classList.add(`theme-${theme}`);
    };

    // Function to apply the list style
    const applyListStyle = (listStyle) => {
        // Remove existing list
        while (listContainer.firstChild) {
            listContainer.removeChild(listContainer.firstChild);
        }

        // Determine list type and style
        let listType = 'ul';
        let listStyleType = 'disc';

        switch (listStyle) {
            case 'bullet':
                listType = 'ul';
                listStyleType = 'disc';
                break;
            case 'number':
                listType = 'ol';
                listStyleType = 'decimal';
                break;
            case 'roman':
                listType = 'ol';
                listStyleType = 'upper-roman';
                break;
            default:
                listType = 'ul';
                listStyleType = 'disc';
                break;
        }

        // Create new list
        const list = document.createElement(listType);
        list.style.listStyleType = listStyleType;

        // Add list items
        listItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            list.appendChild(li);
        });

        // Append list to container
        listContainer.appendChild(list);
    };


    const savePreferences = () => {
        const preferences = {
            theme: themeSelect.value,
            listStyle: listStyleSelect.value
        };
        localStorage.setItem('preferences', JSON.stringify(preferences));
    };


    const loadPreferences = () => {
        const preferences = JSON.parse(localStorage.getItem('preferences'));
        if (preferences) {
            // Apply theme
            themeSelect.value = preferences.theme;
            applyTheme(preferences.theme);
            // Apply list style
            listStyleSelect.value = preferences.listStyle;
            applyListStyle(preferences.listStyle);
        } else {
            // Set default values
            themeSelect.value = 'default';
            listStyleSelect.value = 'bullet';
            applyTheme('default');
            applyListStyle('bullet');
        }
    };

    themeSelect.addEventListener('change', () => {
        const selectedTheme = themeSelect.value;
        applyTheme(selectedTheme);
        savePreferences();
    });

    listStyleSelect.addEventListener('change', () => {
        const selectedListStyle = listStyleSelect.value;
        applyListStyle(selectedListStyle);
        savePreferences();
    });

    loadPreferences();
});
