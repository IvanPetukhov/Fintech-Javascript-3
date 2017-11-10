const listLoad = document.getElementById('list__upload');
let page = 1;
const loadBreakpoint = 100;
let loading = false;

function parseRepositoryInfo(wrapper, name, link, descr, date, commit, data) {
  const formatting = new Intl.DateTimeFormat('ru');
  const created = formatting.format(new Date(data.created_at));
  const lastcommit = formatting.format(new Date(data.updated_at));

  name.textContent = data.name;
  link.href = data.html_url;
  link.textContent = data.html_url;
  descr.textContent = data.description;
  date.textContent = 'Дата создания:' + created;
  commit.textContent = 'Последний коммит:' + lastcommit;

  wrapper.appendChild(name);
  wrapper.appendChild(link);
  wrapper.appendChild(descr);
  wrapper.appendChild(date);
  wrapper.appendChild(commit);

  return wrapper;
}

function createBlock(wrapper, data) {
  const name = document.createElement('h2');
  const link = document.createElement('a');
  const descr = document.createElement('p');
  const date = document.createElement('p');
  const commit = document.createElement('p');

  return parseRepositoryInfo(wrapper, name, link, descr, date, commit, data);
}

function loadmore(pageToLoad) {
  const addr = 'https://api.github.com/orgs/facebook/repos?page=' + pageToLoad.toString();

  loading = true;
  fetch(addr)
    .then(response => response.json())
    .then(data => {
      loading = false;
      if (data.length === 0) {
        window.removeEventListener('scroll');
      } else {
        page += 1;
        data.forEach(elem => listLoad.appendChild(createBlock(document.createElement('div'), elem)));
      }
    })
    .catch(err => {});
}

function scrollHandler() {
  if (!loading && listLoad.getBoundingClientRect().bottom - window.innerHeight < loadBreakpoint) {
    loadmore(page);
  }
}

window.addEventListener('scroll', scrollHandler);
loadmore(page);
