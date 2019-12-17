export default {
  setItem: (name: string, data: any) => {
    if (typeof data === 'object') {
      data = JSON.stringify(data);
    }
    return localStorage.setItem(name, data);
  },
  getItem: (name: string) => {
    const value = localStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  removeItem: (name: string) => localStorage.removeItem(name),
  clear: () => localStorage.clear(),
};
