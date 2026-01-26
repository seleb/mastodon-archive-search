export interface Outbox {
	'@context': string;
	id: string;
	type: string;
	totalItems: number;
	orderedItems: OrderedItem[];
}

export interface OrderedItem {
	id: string;
	type: string;
	actor: string;
	published: string;
	to: string[];
	cc: string[];
	object: {
		atomUri: string;
		attachment: {
			blurhash: string;
			focalPoint: [number, number];
			width: number;
			height: number;
			mediaType: string;
			name: string | null;
			type: string;
			url: string;
		}[];
		attributedTo: string;
		cc: string[];
		content: string | null;
		contentMap: {
			[local: string]: string;
		};
		conversation: string;
		id: string;
		inReplyTo: null | unknown;
		inReplyToAtomUri: null | unknown;
		localOnly: boolean;
		published: string;
		replies: unknown;
		sensitive: boolean;
		summary: null | string;
		tag: { type: string; href: string; name: string }[];
		to: string[];
		type: string;
		url: string;
	};
	signature?: Signature;
	'@context': unknown;
	next?: OrderedItem;
	prev?: OrderedItem;
}

export interface Signature {
	type: string;
	creator: string;
	created: string;
	signatureValue: string;
}
