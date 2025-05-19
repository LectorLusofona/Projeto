function showSection(sectionId) {
    document.querySelectorAll('.dashboard-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

function addProperty() {
    const propertyList = document.getElementById('adminProperties');
    const property = document.createElement('div');
    property.classList.add('property');
    property.innerHTML = `
        <h3>New Property</h3>
        <p>Location: Unknown</p>
        <p>Price: TBD</p>
        <button onclick="removeProperty(this)">Remove</button>
    `;
    propertyList.appendChild(property);
}

function removeProperty(button) {
    button.parentElement.remove();
}

function saveProperties() {
    const properties = [];
    document.querySelectorAll('#adminProperties .property').forEach(property => {
        const title = property.querySelector('h3').innerText;
        const location = property.querySelector('p:nth-child(2)').innerText;
        const price = property.querySelector('p:nth-child(3)').innerText;
        properties.push({ title, location, price });
    });
    localStorage.setItem('properties', JSON.stringify(properties));
}

function loadProperties() {
    const savedProperties = JSON.parse(localStorage.getItem('properties')) || [];
    const propertyList = document.getElementById('adminProperties');
    propertyList.innerHTML = '';
    savedProperties.forEach(propertyData => {
        const property = document.createElement('div');
        property.classList.add('property');
        property.innerHTML = `
            <h3>${propertyData.title}</h3>
            <p>${propertyData.location}</p>
            <p>${propertyData.price}</p>
            <button onclick="removeProperty(this)">Remove</button>
        `;
        propertyList.appendChild(property);
    });
}

document.addEventListener('DOMContentLoaded', loadProperties);
