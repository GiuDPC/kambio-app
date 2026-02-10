import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { signIn, signUp, signInWithGoogle, resetPassword } from "../services/supabase";
import { AppLogo } from "../components/Icon";

type Mode = "login" | "register";

export default function AuthScreen() {
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleSubmit() {
    if (!email.includes("@") || password.length < 6) {
      Alert.alert("Error", "Email valido y password de minimo 6 caracteres");
      return;
    }

    setLoading(true);
    try {
      if (mode === "login") {
        await signIn(email, password);
      } else {
        await signUp(email, password);
        Alert.alert("Cuenta creada", "Revisa tu email para confirmar tu cuenta");
      }
    } catch (error) {
      const err = error instanceof Error ? error.message : "Error desconocido";
      Alert.alert("Error", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      const err = error instanceof Error ? error.message : "Error con Google";
      Alert.alert("Error", err);
    } finally {
      setGoogleLoading(false);
    }
  }

  async function handleForgotPassword() {
    if (!email.includes("@")) {
      Alert.alert("Error", "Ingresa tu email primero");
      return;
    }
    try {
      await resetPassword(email);
      Alert.alert("Listo", "Revisa tu correo para restablecer tu password");
    } catch (error) {
      const err = error instanceof Error ? error.message : "Error";
      Alert.alert("Error", err);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerSection}>
          <AppLogo size={80} />
          <Text style={styles.appName}>TasaVerde</Text>
          <Text style={styles.appTagline}>Tasas en Tiempo Real</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            {mode === "login" ? "Bienvenido de vuelta" : "Crea tu cuenta"}
          </Text>
          <Text style={styles.cardSubtitle}>
            {mode === "login"
              ? "Inicia sesion para continuar"
              : "Registrate para comenzar"}
          </Text>

          <TouchableOpacity
            style={[styles.googleButton, googleLoading && styles.buttonDisabled]}
            onPress={handleGoogleSignIn}
            disabled={googleLoading}
          >
            {googleLoading ? (
              <ActivityIndicator color="#F8FAFC" />
            ) : (
              <View style={styles.googleContent}>
                <Text style={styles.googleIcon}>G</Text>
                <Text style={styles.googleText}>Continuar con Google</Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>o</Text>
            <View style={styles.dividerLine} />
          </View>

          {mode === "register" && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nombre</Text>
              <TextInput
                style={styles.input}
                placeholder="Tu nombre"
                placeholderTextColor="#64748B"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="correo@ejemplo.com"
              placeholderTextColor="#64748B"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Min. 6 caracteres"
                placeholderTextColor="#64748B"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.eyeIcon}>{showPassword ? "◉" : "◎"}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {mode === "login" && (
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotText}>Olvidaste tu password?</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.submitButton, loading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#0F172A" />
            ) : (
              <Text style={styles.submitText}>
                {mode === "login" ? "Iniciar Sesion" : "Crear Cuenta"}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.switchButton}
            onPress={() => setMode(mode === "login" ? "register" : "login")}
          >
            <Text style={styles.switchText}>
              {mode === "login"
                ? "No tienes cuenta? "
                : "Ya tienes cuenta? "}
              <Text style={styles.switchTextBold}>
                {mode === "login" ? "Registrate" : "Inicia Sesion"}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  appName: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#F8FAFC",
    letterSpacing: 1,
    marginTop: 14,
  },
  appTagline: {
    fontSize: 13,
    color: "#94A3B8",
    marginTop: 4,
  },
  card: {
    backgroundColor: "#1E293B",
    borderRadius: 20,
    padding: 28,
    borderWidth: 1,
    borderColor: "#334155",
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#F8FAFC",
    textAlign: "center",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#94A3B8",
    textAlign: "center",
    marginBottom: 20,
  },
  googleButton: {
    backgroundColor: "#334155",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#475569",
    marginBottom: 4,
  },
  googleContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  googleIcon: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#10B981",
  },
  googleText: {
    color: "#F8FAFC",
    fontSize: 15,
    fontWeight: "600",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 18,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#334155",
  },
  dividerText: {
    color: "#64748B",
    paddingHorizontal: 12,
    fontSize: 13,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#CBD5E1",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#0F172A",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#334155",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0F172A",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
  },
  passwordInput: {
    flex: 1,
    padding: 14,
    fontSize: 15,
    color: "#F8FAFC",
  },
  eyeButton: {
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  eyeIcon: {
    fontSize: 20,
    color: "#94A3B8",
  },
  forgotText: {
    color: "#10B981",
    fontSize: 13,
    textAlign: "right",
    marginBottom: 20,
    fontWeight: "500",
  },
  submitButton: {
    backgroundColor: "#10B981",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  submitText: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "700",
  },
  switchButton: {
    alignItems: "center",
  },
  switchText: {
    color: "#94A3B8",
    fontSize: 14,
  },
  switchTextBold: {
    color: "#10B981",
    fontWeight: "700",
  },
});