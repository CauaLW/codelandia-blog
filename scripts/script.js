const sr = ScrollReveal({
    origin: 'top',
    distance: '50px',
    duration: 2000,
    reset: true
});

ScrollReveal().reveal('.card', { delay: 200, reset: false });
ScrollReveal().reveal('.header', { delay: 200, reset: false });
ScrollReveal().reveal('.title', { delay: 300, reset: false });
ScrollReveal().reveal('.resume', { delay: 400, reset: false });

const search = () => {
    const notices = JSON.parse(localStorage.getItem('notices')) || []
    const searchString = document.querySelector('#searchBar').value.toLowerCase()

    const filteredNotices = []
    notices.forEach(notice => {
        const title = notice.title.toLowerCase()
        if(title.includes(searchString)) {
            filteredNotices.push(notice)
        }
    })
    document.querySelector('#content').innerHTML = ''
    renderNotices(filteredNotices)
}

document.querySelector('#searchBar').addEventListener('keyup', search)

const switchFavorite = (element) => {
    const isFavorite = element.classList.contains('favorite')
    if(isFavorite) {
        element.src = './assets/heartIcon.png'
        element.classList.remove('favorite')
    }
    else {
        element.src = './assets/fullHeartIcon.png'
        element.classList.add('favorite')
    }
}

const modal = document.querySelector('#modal')
const addNoticeBtn = document.querySelector('#addNotice')

addNoticeBtn.onclick = function() {
  modal.style.display = "block";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const getFullMonth = (month) => {
    const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
    return months[month]
}

const addNotice = () => {
    event.preventDefault()

    const title = document.querySelector('#title').value
    const resume = document.querySelector('#resume').value
    const date = new Date()
    const day = date.getDate()
    const month = getFullMonth(date.getMonth())
    const year = date.getFullYear()
    const fullDate = `${day} de ${month}, ${year}`

    const notices = JSON.parse(localStorage.getItem('notices')) || []
    
    notices.push({ title, resume, date: fullDate })

    localStorage.setItem('notices', JSON.stringify(notices))

    modal.style.display = 'none'
    window.location.reload()
}

document.querySelector('.form').addEventListener('submit', () => addNotice(this))

const generateCard = (date, title, resume) => {
    const card = document.createElement('div')
    card.classList.add('card')

    const header = document.createElement('div')
    header.classList.add('header')

    const dateSpan = document.createElement('span')
    dateSpan.classList.add('date')
    dateSpan.innerHTML = date

    const image = document.createElement('img')
    image.classList.add('favoriteButton')
    image.src = './assets/heartIcon.png'

    header.appendChild(dateSpan)
    header.appendChild(image)

    const titleHeading = document.createElement('h3')
    titleHeading.classList.add('title')
    titleHeading.innerHTML = title

    const resumeHeading = document.createElement('p')
    resumeHeading.classList.add('resume')
    resumeHeading.innerHTML = resume

    card.appendChild(header)
    card.appendChild(titleHeading)
    card.appendChild(resumeHeading)

    return card
}

const renderNotices = (filteredNotices) => {
    const rootElement = document.querySelector('#content')

    if(filteredNotices) {
        filteredNotices.forEach(notice => {
            const noticeCard = generateCard(notice.date, notice.title, notice.resume)

            rootElement.appendChild(noticeCard)
        })
        return ''
    }

    const notices = JSON.parse(localStorage.getItem('notices')) || []
    
    notices.forEach(notice => {
        const noticeCard = generateCard(notice.date, notice.title, notice.resume)
        
        rootElement.appendChild(noticeCard)
    })

    document.querySelectorAll('.favoriteButton').forEach(btn => {
        btn.addEventListener('click', () => switchFavorite(btn))
    })
}

renderNotices()