const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);

const isPhoneValid = (phone) =>
  phone === "" || /^\+?[1-9]\d{1,14}$/.test(phone);

const isLatitudeValid = (lat) => !isNaN(lat) && lat >= -90 && lat <= 90;

const isLongitudeValid = (lon) => !isNaN(lon) && lon >= -180 && lon <= 180;

const validate = ({ email, phone, name, lat, lon }) => {
  if (email.length && !isEmailValid(email)) {
    alert("Por favor, insira um email válido.");
    return false;
  }

  if (phone.length && !isPhoneValid(phone)) {
    alert("Por favor, insira um telefone válido.");
    return false;
  }

  if (!isLatitudeValid(lat) || !isLongitudeValid(lon)) {
    alert(
      "Por favor, insira uma latitude válida entre -90 e 90 e uma longitude válida entre -180 e 180"
    );
    return false;
  }

  if (!name.length) {
    alert("Por favor, Nome não pode ser vazio.");
    return false;
  }

  if (name.length < 2) {
    alert("Por favor, Nome não pode conter menos de 2 letras.");
    return false;
  }

  return true;
};

export { validate };
