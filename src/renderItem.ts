import { OrderedItem } from './outbox';

export function renderItem(i: OrderedItem) {
	const li = document.createElement('li');
	const a = document.createElement('a');
	a.title = 'open original';
	a.href = i.object.id;
	a.target = '_blank';
	a.rel = 'noreferrer nofollow noopener';
	li.innerHTML = i.object.content || '';
	i.object.attachment.forEach((img) => {
		const elImg = document.createElement('div');
		elImg.innerHTML = img.name || '';
		if (!elImg.innerHTML)
			elImg.textContent = 'Media with no provided descriptive text';
		li.appendChild(elImg);
	});
	if (i.object.summary) {
		const details = document.createElement('details');
		const summary = document.createElement('summary');
		summary.innerHTML = i.object.summary || '';
		details.innerHTML = li.innerHTML;
		li.textContent = '';
		details.prepend(summary);
		details.open = true;
		li.appendChild(details);
	}
	const elTime = document.createElement('time');
	elTime.textContent = new Date(i.object.published).toDateString();
	elTime.dateTime = i.object.published;
	a.appendChild(elTime);
	li.prepend(a);
	return li;
}
