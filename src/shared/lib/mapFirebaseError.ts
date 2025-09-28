
//Функция для замены консольных ошибок на более человекопонятных
export const mapFirebaseError = (error: string): string => {
  if (!error) return "";
  if (error.includes("auth/invalid-credential")) {
    return "Неверный email или пароль";
  }
  if (error.includes("auth/email-already-in-use")) {
    return "Этот email уже зарегистрирован";
  }
  if (error.includes("auth/weak-password")) {
    return "Пароль должен содержать минимум 6 символов";
  }
  if (error.includes("auth/user-not-found")) {
    return "Пользователь с таким email не найден";
  }
  if (error.includes("auth/wrong-password")) {
    return "Неверный пароль";
  }
  return "Произошла ошибка, попробуйте ещё раз";
};
