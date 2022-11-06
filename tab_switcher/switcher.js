(function() {
	let tabs = document.getElementById('tabs')
	let searchbar = document.getElementById('searchbar')
	let c = document.createElement.bind(document)

	let tabsList = []
	let selectedIndex = 1

	function clearTabs() { tabs.innerHTML = '' }

	function tabHoverEvent(e) {
		selectedIndex = this.dataset.index
		refreshTabs()
	}

	function newTab(titleText, urlText, faviconURL) {
		let tab = c('div')
		tab.className = 'tab'

		let favicon = c('img')
		favicon.src = faviconURL

		let meta = c('div')
		let title = c('p')
		let url = c('p')
		meta.className = 'meta'
		title.className = 'title'
		title.innerHTML = titleText
		url.className = 'url'
		url.innerHTML = urlText
		meta.appendChild(title)
		meta.appendChild(url)

		tab.appendChild(favicon)
		tab.appendChild(meta)

		tab.addEventListener('mouseover', tabHoverEvent)

		tabsList.push(tab)
		refreshTabs()

		return tab
	}

	function refreshTabs() {
		clearTabs()

		if (selectedIndex < 0)
			selectedIndex = 0
		if (selectedIndex > tabsList.length - 1)
			selectedIndex = tabsList.length - 1

		for (var i = 0; i < tabsList.length; i++) {
			let t = tabsList[i]

			t.classList.remove('active')

			t.dataset.index = i

			if (i == selectedIndex)
				t.classList.add('active')

			tabs.appendChild(t)
		}
	}

	for (var i = 0; i < 5; i++) {
		let t = newTab(
			'How to Develop Your First Extension | Firefox',
			'https://firefox.com/the-blog/tutorials/your-first-extension-guide',
			'https://placekitten.com/16/16/'
		)
	}

	searchbar.focus()
	searchbar.select()

	searchbar.addEventListener('input', function(e) {
		if (e.data == 'J' || e.data == 'K') {
			if (e.data == 'J')
				selectedIndex++
			else if (e.data == 'K')
				selectedIndex--

			let v = e.target.value
			e.target.value = v.substring(0, v.length - 1);
			refreshTabs()
		}
	})
})()
