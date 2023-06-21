import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '37351481-6ed7b9f731a9010946918b10b';

export const getData = async ({ q, page = 1 }) => {
  try {
    const data = new URLSearchParams({
      key: API_KEY,
      q,
      page,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
    });

    const response = await axios.get(`?${data}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
