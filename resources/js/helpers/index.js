export function resetValidStateForm (form, callback) {
  for (const field of form.elements) {
    field.classList.remove('is-invalid')
  }

  callback({ errors: {} })
}

export function invalidateForm (errors, callback) {
  for (const [field, message] of Object.entries(errors)) {
    formRef.current.elements[field].classList.add('is-invalid')
  }

  callback()
}

export async function postData (url, data, successCallback, errorCallback) {
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({ ...data }),
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.errors) throw new Error(JSON.stringify(data.errors))

      return successCallback(data)
    })
    .catch(error => {
      const errors = JSON.parse(error.message)
      errorCallback(errors)
    })
}

