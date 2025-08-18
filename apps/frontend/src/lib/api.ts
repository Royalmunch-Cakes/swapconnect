const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL

if (!API_BASE_URL) {
  throw new Error("Missing environment variable: NEXT_PUBLIC_BACKEND_API_URL")
}

interface ApiResponse<T> {
  success: boolean
  message?: string
  data?: T
  error?: string
  status?: number
  [key: string]: unknown
}

export async function post<T = unknown, U = unknown>(
  url: string,
  body: U,
  options?: RequestInit,
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
      body: JSON.stringify(body),
      ...options,
    })

    let responseData: unknown = {}
    try {
      responseData = await response.json()
    } catch {
      // Ignore non-JSON responses
    }

    const safeData =
      typeof responseData === "object" && responseData !== null ? (responseData as Record<string, unknown>) : {}

    return {
      success: response.ok,
      status: response.status,
      message: typeof safeData.message === "string" ? safeData.message : undefined,
      data: safeData.data !== undefined ? (safeData.data as T) : undefined,
      error:
        !response.ok && typeof safeData.error === "string"
          ? safeData.error
          : !response.ok && typeof safeData.message === "string"
            ? safeData.message
            : undefined,
      ...safeData,
    }
  } catch (error: unknown) {
    console.error(`POST error to ${url}:`, error)
    return {
      success: false,
      status: 500,
      error: error instanceof Error ? error.message : "Network error or unable to connect to server",
    }
  }
}

export async function get<T = unknown>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      method: "GET",
      ...(options || {}),
    })

    const responseData = await response.json()

    return {
      success: response.ok,
      status: response.status,
      message: responseData.message,
      data: responseData.data as T,
      error:
        !response.ok && typeof responseData.error === "string"
          ? responseData.error
          : !response.ok && typeof responseData.message === "string"
            ? responseData.message
            : undefined,
      ...responseData,
    }
  } catch (error: unknown) {
    console.error(`GET error from ${url}:`, error)
    return {
      success: false,
      status: 500,
      error: error instanceof Error ? error.message : "Network error or unable to connect to server",
    }
  }
}

export async function put<T = unknown, U = unknown>(
  url: string,
  body: U,
  options?: RequestInit,
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
      body: JSON.stringify(body),
      ...options,
    })

    let responseData: unknown = {}
    try {
      responseData = await response.json()
    } catch {
      // Ignore non-JSON responses
    }

    const safeData =
      typeof responseData === "object" && responseData !== null ? (responseData as Record<string, unknown>) : {}

    return {
      success: response.ok,
      status: response.status,
      message: typeof safeData.message === "string" ? safeData.message : undefined,
      data: safeData.data !== undefined ? (safeData.data as T) : undefined,
      error:
        !response.ok && typeof safeData.error === "string"
          ? safeData.error
          : !response.ok && typeof safeData.message === "string"
            ? safeData.message
            : undefined,
      ...safeData,
    }
  } catch (error: unknown) {
    console.error(`PUT error to ${url}:`, error)
    return {
      success: false,
      status: 500,
      error: error instanceof Error ? error.message : "Network error or unable to connect to server",
    }
  }
}

export async function del<T = unknown>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      ...(options || {}),
    })

    let responseData: unknown = {}
    try {
      responseData = await response.json()
    } catch {
      // Ignore non-JSON responses for DELETE requests
    }

    const safeData =
      typeof responseData === "object" && responseData !== null ? (responseData as Record<string, unknown>) : {}

    return {
      success: response.ok,
      status: response.status,
      message: typeof safeData.message === "string" ? safeData.message : undefined,
      data: safeData.data !== undefined ? (safeData.data as T) : undefined,
      error:
        !response.ok && typeof safeData.error === "string"
          ? safeData.error
          : !response.ok && typeof safeData.message === "string"
            ? safeData.message
            : undefined,
      ...safeData,
    }
  } catch (error: unknown) {
    console.error(`DELETE error from ${url}:`, error)
    return {
      success: false,
      status: 500,
      error: error instanceof Error ? error.message : "Network error or unable to connect to server",
    }
  }
}

export const api = {
  post: async <T, U>(path: string, data: U, token?: string): Promise<ApiResponse<T>> => {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }
    return post<T, U>(`${API_BASE_URL}${path}`, data, { headers })
  },
  get: async <T>(path: string, token?: string): Promise<ApiResponse<T>> =>
{
  const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {}
  return get<T>(`${API_BASE_URL}${path}`, { headers })
}
,

  put: async <T, U>(path: string, data: U, token?: string): Promise<ApiResponse<T>> =>
{
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
  return put<T, U>(`${API_BASE_URL}${path}`, data, { headers })
}
,

  delete: async <T>(path: string, token?: string): Promise<ApiResponse<T>> =>
{
  const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {}
  return del<T>(`${API_BASE_URL}${path}`, { headers })
}
,
}
