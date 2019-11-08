console.log('worked');

console.dir(document);

const rootEl = document.querySelector('#root');

const addEl = document.createElement('button');

const posts = [];
const addFormEl = document.createElement('form');
addFormEl.className = 'form-inline mb-2'; 
addFormEl.innerHTML = `
    <div class="form-group">
        <input class="form-control" data-id="link">
    </div>
    <select class="custom-select" data-id="type">
        <option value="regular">Обычный</option>
        <option value="image">Изображение</option>
        <option value="audio">Аудио</option>
        <option value="video">Видео</option>
    </select>
    <button class="btn btn-primary">Ok</button>
`;
const linkEl = addFormEl.querySelector('[data-id=link]');
const typeEl = addFormEl.querySelector('[data-id=type]');

addFormEl.addEventListener('submit', function (ev) {
    ev.preventDefault();
    const value = linkEl.value;
    const type = typeEl.value; 
    console.log(type);
    posts.push({
        value,
        type,
        likes: 0,
    }); 
    console.log(posts);
    linkEl.value = '';
    typeEl.value = 'regular';
    rebuildList(postsEl, posts);
});
rootEl.appendChild(addFormEl);

const postsEl = document.createElement('div');
postsEl.dataset.id = 'posts';
rootEl.appendChild(postsEl);

function rebuildList(containerEl, items) {
    containerEl.innerHTML = '';
    for (const item of items) {
        const postEl = document.createElement('div');
        postEl.className = 'card mb-2';
        if (item.type === 'regular') {
            postEl.innerHTML = `
                <div class="card-body">
                    <div class="card-text">${item.value}</div>
                    <button class="btn">♡ ${item.likes}</button>
                    <button class="btn btn-primary" data-action="like">like</button>
                    <button class="btn btn-danger" data-action="dislike">dislike</button>
                </div>
            `;
        } else if (item.type === 'image') {
            postEl.innerHTML = `
                <img src="${item.value}" class="card-img-top">
                <div class="card-body">
                    <button class="btn">♡ ${item.likes}</button>
                    <button class="btn btn-primary" data-action="like">like</button>
                    <button class="btn btn-danger" data-action="dislike">dislike</button>
                </div>
            `;
        } else if (item.type === 'audio') {
            postEl.innerHTML = `
                <audio src="${item.value}" class="card-audio-top">
                <div class="card-body">
                    <button class="btn">♡ ${item.likes}</button>
                    <button class="btn btn-primary" data-action="like">like</button>
                    <button class="btn btn-danger" data-action="dislike">dislike</button>
                </div>
            `;
        } else if (item.type === 'video') {
            postEl.innerHTML = `
                <video src="${item.value}" class="card-video-top">
                <div class="card-body">
                    <button class="btn">♡ ${item.likes}</button>
                    <button class="btn btn-primary" data-action="like">like</button>
                    <button class="btn btn-danger" data-action="dislike">dislike</button>
                </div>
            `;
        }
        
        postEl.querySelector('[data-action=like]').addEventListener('click', function(ev) {
            item.likes++;
            rebuildList(containerEl, items);
            if (ev.target.dataset.action === like) {
                const el = ev.target.closest('[data-type=post]');
                if (el.previousElementSibling === null) {
                    return;
                }
                el.parentElement.insertBefore(
                    el,
                    el.previousElementSibling,
                );
                syncButtons(ev.currentTarget);
                return;
            }
        });

        postEl.querySelector('[data-action=dislike]').addEventListener('click', function(ev) {
            item.likes--;
            rebuildList(containerEl, items);
            const el = ev.target.closest('[data-type=post]');
                if (el.nextElementSibling === null) {
                    return;
                }
                el.parentElement.insertBefore(
                    el.nextElementSibling,
                    el,
                );
                syncButtons(ev.currentTarget);
                return;
  
        });
        
            containerEl.appendChild(postEl);
    }
    
}

rootEl.appendChild(addEl);