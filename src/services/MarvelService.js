class MarvelService {
	_apiBase = 'https://gateway.marvel.com:443/v1/public/';
	_apiKey = 'apikey=494eb058b13eaa960a9709ac98a8b390';
	_baseOffset = 210;

	getResource = async (url) => {
		let res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	}

	getAllCharacters = async (offset= this._baseOffset) => {
		const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
		return res.data.results.map(this._transformCharacter);
	}

	getCharacter = async (id) => {
		const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);

		// const character = this._transformCharacter(res.data.results[0]);
		// const notFound = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
		// character.imageClass = character.thumbnail === notFound ? 'randomchar__not-found' : 'randomchar__img';
		//
		// return character

		return this._transformCharacter(res.data.results[0]);
	}

	_transformCharacter = (char) => {

		return {
			id: char.id,
			name: char.name,
			// description: char.description && char.description.length > 50 ? char.description.slice(0, 210) + '...' : (char.description ? char.description : 'There is no description'),
			description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',

			thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items
		}
	}
}

export default MarvelService;