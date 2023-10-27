const addNewAccount = async (addData) => {
  try {
    const res = await fetch('http://localhost:5000/formCreateaccount', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(addData)
    })
  } catch (error) {
    alert(`error: ${error}`)
  }
}

const updateUser = async (data) => {
  const id = localStorage.getItem("id")
  try{
      const res = await fetch(`http://localhost:5000/formCreateaccount/${id}` , {
      method: "PUT",
      headers:{
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
      })
  }catch (error) {
      alert(`There is an error ${error}`)
  }
}


const getUser = async () => {
  try {
    const res = await fetch('http://localhost:5000/formCreateaccount')
    if (res.ok) {
      const loginData = await res.json()
      return loginData
    }
    else
      throw new Error('cannot read data')
  }
  catch (error) {
    throw error
  }
}


const getUserById = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/formCreateaccount/${id}`)
    if (res.ok) {
      const loginData = await res.json()
      return loginData
    }
    else
      throw new Error('cannot read data')
  }
  catch (error) {
    throw error
  }
}


const fetchUserData = async (userId, data) => {
  try {
    await fetch(`http://localhost:5000/formCreateaccount/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cart: data }),
    });
  } catch (error) {
    throw error
  }
}


const productDetail = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/products/${id}`);
    const data = await response.json();
    return data
  } catch (error) {
    throw error
  }
};



const getProduct = async () => {
  try {
    const response = await fetch('http://localhost:5000/products')
    const data = await response.json();
    return data
  } catch (error) {
    throw error
  }
}

const deleteUser = async () => {
  try {
    const id = localStorage.getItem("id")
    const resuser = await fetch(`http://localhost:5000/formCreateaccount/${id}`, {
      method: "DELETE"
    })
    if (resuser.ok) {
      localStorage.clear()
    }
  }
  catch (error) {
    alert(`error: ${error}`)
  }
}

const updateProduct = async (userId, cartArray) => {
  try {
    const res = await fetch(`http://localhost:5000/formCreateaccount/${userId}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        cart: cartArray
      })
    })
  }
  catch (error) {
    throw error
  }
}
export { getUser, productDetail, getProduct, getUserById, fetchUserData, deleteUser, addNewAccount, updateProduct, updateUser } 
