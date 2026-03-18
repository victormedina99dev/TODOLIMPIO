export class AuthService {
  constructor(auth, googleProvider, db) {
    this.auth = auth;
    this.googleProvider = googleProvider;
    this.db = db;
  }

  async loginWithGoogle() {
    const { signInWithPopup } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js");
    return await signInWithPopup(this.auth, this.googleProvider);
  }

  async checkUserProfile(user) {
    const { doc, getDoc } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
    const userRef = doc(this.db, "usuarios", user.uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists() && userSnap.data().direccion) {
      return { hasProfile: true, redirectTo: "todolimpio_solicitud_de_servicio.html" };
    }
    return { hasProfile: false, redirectTo: "registro-direccion.html" };
  }

  async handleLogin() {
    try {
      const result = await this.loginWithGoogle();
      const user = result.user;
      const profile = await this.checkUserProfile(user);
      window.location.href = profile.redirectTo;
    } catch (error) {
      console.error("Error en autenticación:", error);
      throw error;
    }
  }
}

export class AuthController {
  constructor(authService, buttonId) {
    this.authService = authService;
    this.button = document.getElementById(buttonId);
    this.init();
  }

  init() {
    if (this.button) {
      this.button.addEventListener('click', () => {
        this.authService.handleLogin();
      });
    }
  }
}
