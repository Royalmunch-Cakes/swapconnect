const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

if (!API_BASE_URL) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_BACKEND_API_URL');
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  status?: number;
  [key: string]: unknown;
}

async function makeRequest<T = unknown>(
  url: string,
  options: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, options);

    let responseData: unknown = {};
    try {
      responseData = await response.json();
    } catch {
      // Ignore non-JSON responses
    }

    const safeData =
      typeof responseData === 'object' && responseData !== null
        ? (responseData as Record<string, unknown>)
        : {};

    return {
      success: response.ok,
      status: response.status,
      message:
        typeof safeData.message === 'string' ? safeData.message : undefined,
      data: safeData.data !== undefined ? (safeData.data as T) : undefined,
      error:
        !response.ok && typeof safeData.error === 'string'
          ? safeData.error
          : !response.ok && typeof safeData.message === 'string'
          ? safeData.message
          : undefined,
      ...safeData,
    };
  } catch (error: unknown) {
    console.error(`Request error to ${url}:`, error);
    return {
      success: false,
      status: 500,
      error:
        error instanceof Error
          ? error.message
          : 'Network error or unable to connect to server',
    };
  }
}

export const api = {
  get: async <T>(path: string, token?: string): Promise<ApiResponse<T>> => {
    const headers: HeadersInit = token
      ? { Authorization: `Bearer ${token}` }
      : {};
    return makeRequest<T>(`${API_BASE_URL}${path}`, {
      method: 'GET',
      headers,
    });
  },

  post: async <T, U>(
    path: string,
    data: U,
    token?: string
  ): Promise<ApiResponse<T>> => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    return makeRequest<T>(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
  },

  put: async <T, U>(
    path: string,
    data: U,
    token?: string
  ): Promise<ApiResponse<T>> => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    return makeRequest<T>(`${API_BASE_URL}${path}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });
  },

  patch: async <T, U>(
    path: string,
    data: U,
    token?: string
  ): Promise<ApiResponse<T>> => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    return makeRequest<T>(`${API_BASE_URL}${path}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(data),
    });
  },

  delete: async <T>(path: string, token?: string): Promise<ApiResponse<T>> => {
    const headers: HeadersInit = token
      ? { Authorization: `Bearer ${token}` }
      : {};
    return makeRequest<T>(`${API_BASE_URL}${path}`, {
      method: 'DELETE',
      headers,
    });
  },
};
