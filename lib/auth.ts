export interface AdminUser {
  username: string
  isAuthenticated: boolean
  loginTime: string
}

export class AuthService {
  private static readonly STORAGE_KEY = "albautoparts_admin_session"
  private static readonly SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

  private static readonly DEFAULT_CREDENTIALS = {
    username: "Luis",
    password: "luisi123",
  }

  static login(username: string, password: string): boolean {
    if (username === this.DEFAULT_CREDENTIALS.username && password === this.DEFAULT_CREDENTIALS.password) {
      const session: AdminUser = {
        username,
        isAuthenticated: true,
        loginTime: new Date().toISOString(),
      }

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(session))
      }

      return true
    }
    return false
  }

  static logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.STORAGE_KEY)
    }
  }

  static getCurrentUser(): AdminUser | null {
    if (typeof window === "undefined") {
      return null
    }

    const stored = localStorage.getItem(this.STORAGE_KEY)
    if (!stored) {
      return null
    }

    try {
      const session: AdminUser = JSON.parse(stored)

      // Check if session is expired
      const loginTime = new Date(session.loginTime).getTime()
      const now = new Date().getTime()

      if (now - loginTime > this.SESSION_DURATION) {
        this.logout()
        return null
      }

      return session
    } catch {
      this.logout()
      return null
    }
  }

  static isAuthenticated(): boolean {
    const user = this.getCurrentUser()
    return user?.isAuthenticated ?? false
  }

  static changePassword(currentPassword: string, newPassword: string): boolean {
    if (currentPassword !== this.DEFAULT_CREDENTIALS.password) {
      return false
    }

    // In a real application, you would update the password in a secure way
    // For this demo, we'll just validate the current password
    console.log("Password change requested - implement secure password storage")
    return true
  }
}
