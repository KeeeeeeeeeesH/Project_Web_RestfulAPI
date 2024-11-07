//จัดการ dropdown
document.addEventListener("DOMContentLoaded", function () {
    const adminDropdown = document.getElementById('adminDropdown');
    const adminDropdownContent = document.getElementById('adminDropdownContent');

    adminDropdown.addEventListener('click', function () {
        adminDropdownContent.classList.toggle('show');
    });

    const memberDropdown = document.getElementById('memberDropdown');
    const memberDropdownContent = document.getElementById('memberDropdownContent');

    memberDropdown.addEventListener('click', function () {
        memberDropdownContent.classList.toggle('show');
    });

    const newsDropdown = document.getElementById('newsDropdown');
    const newsDropdownContent = document.getElementById('newsDropdownContent');

    newsDropdown.addEventListener('click', function () {
        newsDropdownContent.classList.toggle('show');
    });

    const categoryDropdown = document.getElementById('categoryDropdown');
    const categoryDropdownContent = document.getElementById('categoryDropdownContent');

    categoryDropdown.addEventListener('click', function () {
        categoryDropdownContent.classList.toggle('show');
    });

    const majorDropdown = document.getElementById('majorDropdown');
    const majorDropdownContent = document.getElementById('majorDropdownContent');

    majorDropdown.addEventListener('click', function () {
        majorDropdownContent.classList.toggle('show');
    });

    const work_statusDropdown = document.getElementById('work_statusDropdown');
    const work_statusContent = document.getElementById('work_statusContent');

    work_statusDropdown.addEventListener('click', function () {
        work_statusContent.classList.toggle('show');
    });

    
});
