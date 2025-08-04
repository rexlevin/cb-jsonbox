(function () {
    const liArray = document.querySelectorAll('.tabs li');
    liArray.forEach(li => {
        li.classList.add('tab-default');
        li.addEventListener('click', e => {
            liArray.forEach(li => {
                li.classList.remove('tab-selected');
            });
            e.target.classList.add('tab-selected');
        });
    });

    const liMenuArray = document.querySelectorAll('.tab-menu li');
    liMenuArray.forEach(li => {
        li.classList.add('tab-menu-default');
        li.addEventListener('click', e => {
            liMenuArray.forEach(li => {
                li.classList.remove('tab-menu-selected');
            });
            e.target.classList.add('tab-menu-selected');
        });
    });
})();
