export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
    const baseUrl = 'http://localhost:8000';
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
    };

    const token = localStorage.getItem('access_token');
    if (token) {
        (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }
    
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        headers,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An error occurred');
      }
  
      return await response.json();
    } catch (error: any) {
      console.error('API Error:', error.message);
      throw error;
    }
};