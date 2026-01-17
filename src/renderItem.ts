import { OrderedItem } from './outbox';

export function renderItem(i: OrderedItem) {
	const li = document.createElement('li');
	const aOriginal = document.createElement('a');
	aOriginal.title = 'open original';
	aOriginal.href = i.object.id;
	aOriginal.target = '_blank';
	aOriginal.rel = 'noreferrer nofollow noopener';
	const aPrev = document.createElement('a');
	aPrev.title = 'open the post chronologically before this one';
	aPrev.href = i.prev?.object.id || '';
	aPrev.target = '_blank';
	aPrev.rel = 'noreferrer nofollow noopener';
	aPrev.textContent = '⮜';
	const aNext = document.createElement('a');
	aNext.title = 'open the post chronologically after this one';
	aNext.href = i.next?.object.id || '';
	aNext.target = '_blank';
	aNext.rel = 'noreferrer nofollow noopener';
	aNext.textContent = '⮞';
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
	aOriginal.appendChild(elTime);
	if (aNext.href) li.prepend(aNext);
	if (aPrev.href) li.prepend(aPrev);
	li.prepend(aOriginal);
	return li;
}
