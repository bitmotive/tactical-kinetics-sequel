var ls = {};

ls.gk = (item) => { localStorage.getItem(item) }
ls.sk = (item, value) => { localStorage.setItem(item, value) }
ls.gkJSON = (item) => {
    try {
        return JSON.parse(localStorage.getItem(item));
    } catch(e) {
        return null;
    }
}

global.API_ENDPOINT = "https://www.rogueshopsdemo.com/api";
global.SITE_DOMAIN = "https://www.rogueshops.com/";
global.SITE_NAME = "RogueShops";
global.API = {};
global.API.cacheLoaded = false;
global.API.cache = {};
global.API.tools = {};

global.API.tools.toSlug = (id, title) => {
    var stringSanitizer = require("string-sanitizer");
    return String(stringSanitizer.sanitize.addDash(id + " " + title)).toLowerCase();
}

global.API.tools.toCategorySlug = (text) => {
    var stringSanitizer = require("string-sanitizer");
    return String(stringSanitizer.sanitize.addDash(text)).toLowerCase();
}

global.API.tools.formatMoney = (price) => {
    return "$" + String(parseFloat(price).toFixed(2));
}

global.API.lookupVariant = (pid, vid) => {
    return new Promise(function(resolve, reject) {
        var endpointProducts = global.API_ENDPOINT + "/shop/bigcommerce/products?id=" + encodeURI(pid);
        var variants = [];
        var filtered = [];
        fetch(endpointProducts)
        .then(res => res.json())
        .then(
            (success) => {
                variants = success.data.variants;
                filtered = variants.filter(function(variant) {
                    if(variant.id == vid) {
                        return true;
                    }
                });
                var ret = {
                    variant_id: filtered[0].id,
                    product_id: filtered[0].product_id,
                    options: []
                };
                for(var i of filtered[0].option_values) {
                    ret.options.push({
                        title: String(i.option_display_name),
                        value: String(i.label)
                    });
                }
                resolve(ret);
            },
            (error) => {
                reject(error);
            }
        );
    });
}

global.API.getProducts = (id, category) => {
    return new Promise(function(resolve, reject) {
        var endpointProducts = "";
        if(id) {
            endpointProducts = global.API_ENDPOINT + "/shop/bigcommerce/products?id=" + parseInt(id);
        } else if(category) {
            endpointProducts = global.API_ENDPOINT + "/shop/bigcommerce/products?categories=" + parseInt(category);
        } else {
            endpointProducts = global.API_ENDPOINT + "/shop/bigcommerce/products";
        }
        fetch(endpointProducts)
        .then(res => res.json())
        .then(
        (success) => {
            resolve(success);
        },
        (error) => {
            reject(error);
        });
    });
};

global.API.searchProducts = (query) => {
    return new Promise(function(resolve, reject) {
        var endpointProducts = global.API_ENDPOINT + "/shop/bigcommerce/products?search=";
        endpointProducts += encodeURIComponent(query);
        fetch(endpointProducts)
        .then(res => res.json())
        .then(
        (success) => {
            resolve(success);
        },
        (error) => {
            reject(error);
        });
    });
}

global.API.getSimpleProducts = () => {
    var stringSanitizer = require("string-sanitizer");
    return new Promise(function(resolve, reject) {
        var endpointProducts = global.API_ENDPOINT + "/shop/bigcommerce/products";
        var dict_array = [];
        fetch(endpointProducts)
        .then(res => res.json())
        .then(
        (success) => {
            for(var i = 0; i < success.data.data.length; i++) {
                let item = {
                    title: success.data.data[i].name,
                    price: success.data.data[i].price,
                    image: success.data.data[i].images.length > 0 ? success.data.data[i].images[0].url_standard : "",
                    slug: stringSanitizer.sanitize.addDash(success.data.data[i].id + " " + success.data.data[i].name),
                }
                dict_array.push(item);
            }
            resolve(dict_array);
        },
        (error) => {
            reject(error);
        });
    });
}

global.API.getCart = () => {
    return new Promise(function(resolve, reject) {
        var endpointCart = global.API_ENDPOINT + "/shop/bigcommerce/cart";
        fetch(endpointCart)
        .then(res => res.json())
        .then(
            (success) => {
                resolve(success);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

global.API.addToCart = (id, quantity, options=null) => {
    return new Promise(function(resolve, reject) {
        var endpointCart = global.API_ENDPOINT + "/shop/bigcommerce/cart?pid=" + id + (quantity ? "&quantity=" + quantity : "");
        var optionsString = "";
        if(options) {
            for(var option of options) {
                // optionsString += option.id + ":" + option.currentValue + ",";
                optionsString += option.currentValue + ",";
            }
            optionsString = optionsString.substring(0, optionsString.length-1);
            endpointCart += "&options=" + encodeURIComponent(optionsString);
        }
        fetch(endpointCart, {
            method: 'POST',
            headers: {
                // 'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(
            (success) => {
                resolve(success);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

global.API.removeFromCart = (id) => {
    return new Promise(function(resolve, reject) {
        var endpointCart = global.API_ENDPOINT + "/shop/bigcommerce/cart?pid=" + id;
        fetch(endpointCart, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(
            (success) => {
                resolve(success);
            },
            (error) => {
                reject(error);
            }
        );
    });
}

global.API.updateCart = (id, quantity) => {
    return new Promise(function(resolve, reject) {
        var endpointUpdateCart = global.API_ENDPOINT + "/shop/bigcommerce/cart";
        var content = {
            pid: parseInt(id),
            quantity: parseInt(quantity)
        }
        fetch(endpointUpdateCart, {
            method: 'PUT',
            body: JSON.stringify(content)
        })
        .then(res => res.json())
        .then(
            (success) => {
                resolve(success);
            },
            (error) => {
                reject(error);
            }
        );
    });
}

global.API.login = (email, password) => {
    return new Promise(function(resolve, reject) {
        var endpointLogin = global.API_ENDPOINT + "/user/login";
        let content = {
            "email": email,
            "password": password
        }
        fetch(endpointLogin, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(content)
        })
        .then(res => res.json())
        .then(
            (success) => {
                resolve(success);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

global.API.logout = () => {
    return new Promise(function(resolve, reject) {
        var endpointLogout = global.API_ENDPOINT + "/user/logout";
        fetch(endpointLogout)
        .then(res => res.json())
        .then(
            (success) => {
                resolve(success);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

global.API.register = (fname, lname, email, phone, password) => {
    return new Promise(function(resolve, reject) {
        var endpointRegister = global.API_ENDPOINT + "/user/register";
        let content = {
            "first_name": fname,
            "last_name": lname,
            "email": email,
            "phone": phone,
            "password": password
        }
        fetch(endpointRegister, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(content)
        })
        .then(res => res.json())
        .then(
            (success) => {
                resolve(success);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

global.API.forgotPassword = (email) => {
    return new Promise(function(resolve, reject) {
        var endpointForgotPassword = global.API_ENDPOINT + "/user/forgot_password";
        let content = {
            "email": email
        }
        fetch(endpointForgotPassword, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(content)
        })
        .then(res => res.json())
        .then(
            (success) => {
                resolve(success);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

global.API.dashboard = () => {
    return new Promise(function(resolve, reject) {
        var endpointDashboard = global.API_ENDPOINT + "/user/dashboard";
        fetch(endpointDashboard)
        .then(res => res.json())
        .then(
            (success) => {
                resolve(success);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

global.API.checkout = (content_dict) => {
    return new Promise(function(resolve, reject) {
        var endpointCheckout = global.API_ENDPOINT + "/shop/bigcommerce/cart/order";
        fetch(endpointCheckout, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(content_dict)
        })
        .then(res => res.json())
        .then(
            (success) => {
                resolve(success);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

global.API.getCategories = () => {
    return new Promise(function(resolve, reject) {
        var endpointCategories = global.API_ENDPOINT + "/shop/bigcommerce/products/categories";
        fetch(endpointCategories)
        .then(res => res.json())
        .then(
            (success) => {
                resolve(success);
            },
            (error) => {
                reject(error);
            }
        );
    });
}

global.API.postForgotPassword = (email) => {
    return new Promise(function(resolve, reject) {
        var endpointForgotPassword = global.API_ENDPOINT + "/user/forgot_password";
        var content = {
            email: email
        }
        fetch(endpointForgotPassword, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(content)
        })
        .then(res => res.json())
        .then(
            (success) => {
                resolve(success);
            },
            (error) => {
                reject(error);
            }
        );
    });
}

global.API.addCoupon = (code) => {
    return new Promise(function(resolve, reject) {
        var endpointCoupon = global.API_ENDPOINT + "/shop/bigcommerce/cart/add_coupon/" + code;
        fetch(endpointCoupon,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(
            (success) => {
                resolve(success);
            },
            (error) => {
                reject(error);
            }
        );
    });
}

global.API.removeCoupon = (code) => {
    return new Promise(function(resolve, reject) {
        var endpointCoupon = global.API_ENDPOINT + "/shop/bigcommerce/cart/remove_coupon/" + code;
        fetch(endpointCoupon,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(
            (success) => {
                resolve(success);
            },
            (error) => {
                reject(error);
            }
        );
    });
}

global.API.getUserInfo = () => {
    return new Promise(function(resolve, reject) {
        var endpointUserInfo = global.API_ENDPOINT + "/user/user_info";
        fetch(endpointUserInfo)
        .then(res => res.json())
        .then(
            (success) => {
                resolve(success);
            },
            (error) => {
                reject(error);
            }
        );
    });
}

global.API.sendContactMessage = (dict) => {
    return new Promise(function(resolve, reject) {
        var endpointContact = global.API_ENDPOINT + "/user/email";
        var content = {
            first_name: String(dict.first_name),
            last_name: String(dict.last_name),
            email: String(dict.email),
            order_number: parseInt(dict.order_number),
            company_name: String(dict.company_name),
            rma_number: parseInt(dict.rma_number),
            subject: String(dict.subject),
            message: String(dict.message)
        }
        fetch(endpointContact, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(content)
        })
        .then(res => res.json())
        .then(
            (success) => {
                resolve(success);
            },
            (error) => {
                reject(error);
            }
        );
    });
}
