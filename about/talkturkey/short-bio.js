var target = document.getElementById('target');
var titles = [
    'Title 1',
    'Title 2',
    'Title 3',
    'Title 4',
    'Title 5'
];

function newTitle() {
    var i = (Math.random() * titles.length) | 0;
    target.innerText = titles[i];
}

newTitle();
