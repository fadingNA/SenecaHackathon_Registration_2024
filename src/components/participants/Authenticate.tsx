// AuthService.ts
import { Auth, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { auth } from "../../model/data/firebase/Firebase_config"; // import your Firebase auth instance

export class AuthService {
  private auth: Auth;

  constructor(authInstance: Auth) {
    this.auth = authInstance;
  }

  async signIn(email: string, password: string): Promise<User | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      console.error("Failed to sign in", error);
      return null;
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error("Failed to sign out", error);
      throw error;
    }
  }

  isUserLoggedIn(): boolean {
    return this.auth.currentUser != null;
  }
}

const authService = new AuthService(auth);
export default authService;
