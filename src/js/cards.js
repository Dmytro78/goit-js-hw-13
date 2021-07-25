import axios from "axios";

const API_KEY = '22640330-7a3d8d7b0f506b04b575708a2';
const BASE_URL = 'https://pixabay.com/api/';

export default class ApiCards {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 20;
  }

  async fetchImages() {
    const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`;

    const response = await axios.get(url);

    this.page += 1;
    return response.data;
  }

  resetPage() {
    this.page = 1;
  }
}
