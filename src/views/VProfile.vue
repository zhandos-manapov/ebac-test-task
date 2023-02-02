<template>
    <div class="row">
        <div class="col">
            <div class="user-page card">
                <div class="user-page__avatar">
                    <div class="user-avatar-wrapper">
                        <img src="https://cdn-icons-png.flaticon.com/512/147/147144.png" alt="Avatar"
                            class="user-avatar">
                    </div>
                    <div class="user-page__buttons">
                        <button class="btn btn-change">Change Avatar</button>
                        <button class="btn btn-delete">Delete Avatar</button>
                    </div>
                </div>

                <div class="user-info">
                    <h1>User name</h1>
                    <p>Birth date</p>
                    <p>Email</p>
                    <p>Location</p>
                    <p>Phone number</p>
                    <p>Languages</p>
                </div>
            </div>

            <div class="user-password card">
                <Form @submit="onPasswordReset">
                    <div>
                        <label for="oldPassword">Old Password</label>
                        <Field class="control" name="oldPassword" type="password" id="oldPassword"
                            :rules="isRequired" />
                        <ErrorMessage class="error" name="oldPassword" />
                    </div>

                    <div>
                        <label for="newPassword">New Password</label>
                        <Field class="control" name="newPassword" type="password" id="newPassword"
                            :rules="isRequired" />
                        <ErrorMessage class="error" name="newPassword" />
                    </div>

                    <div>
                        <label for="confirmPassword">Confirm Password</label>
                        <Field class="control" name="confirmPassword" type="password" id="confirmPassword"
                            :rules="isRequired" />
                        <ErrorMessage class="error" name="confirmPassword" />
                    </div>

                    <button type="submit" class="btn btn-submit">Reset Password</button>
                    <button type="reset" class="btn btn-clear">Clear</button>
                </Form>
            </div>
        </div>

        <div class="col">
            <div class="user-form card">
                <Form @submit="onSubmit">
                    <div>
                        <label for="firstName">First Name</label>
                        <Field class="control" name="firstName" type="text" id="firstName" :rules="isRequired" />
                        <ErrorMessage class="error" name="firstName" />
                    </div>

                    <div>
                        <label for="lastName">Last Name</label>
                        <Field class="control" name="lastName" type="text" id="lastName" :rules="isRequired" />
                        <ErrorMessage class="error" name="lastName" />
                    </div>

                    <div>
                        <label for="birthDate">Birth Date</label>
                        <Field class="control" name="birthDate" type="date" id="birthDate" />
                        <ErrorMessage class="error" name="birthDate" />
                    </div>

                    <div>
                        <label for="email">Email</label>
                        <Field class="control" name="email" type="email" id="email" :rules="validateEmail" />
                        <ErrorMessage class="error" name="email" />
                    </div>

                    <div>
                        <label for="location">Location</label>
                        <Field class="control" name="location" type="text" id="location" />
                        <ErrorMessage class="error" name="location" />
                    </div>

                    <div>
                        <label for="phoneNumber">Phone No.</label>
                        <vue-tel-input v-model="phoneNumber" mode="international" id="phoneNumber" @blur="onBlur"
                            @validate="onValidate"></vue-tel-input>
                        <span class="error" v-if="showPhoneError">This field is invalid</span>
                    </div>

                    <div>
                        <label for="languages">Languages</label>
                        <Field class="control" v-slot="{ value }" name="language" as="select" multiple>
                            <option value="" disabled>Select a language</option>
                            <option v-for="language in languages" :key="language" :value="language"
                                :selected="value && value.includes(language)">{{ language }}</option>
                        </Field>
                        <ErrorMessage name="language" />
                    </div>

                    <button type="submit" class="btn btn-submit">Submit</button>
                    <button type="reset" class="btn btn-clear">Clear</button>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/dist/vue-tel-input.css';

export default {
    name: 'VProfile',
    components: {
        Form,
        Field,
        ErrorMessage,
        VueTelInput
    },
    data() {
        return {
            phoneNumber: '',
            showPhoneError: false,
            phoneValid: false,
            languages: ['Afrikaans', 'Albanian - shqip', 'Amharic - አማርኛ', 'Arabic - العربية', 'Aragonese - aragonés', 'Armenian - հայերեն', 'Asturian - asturianu', 'Azerbaijani - azərbaycan dili', 'Basque - euskara', 'Belarusian - беларуская', 'Bengali - বাংলা', 'Bosnian - bosanski', 'Breton - brezhoneg', 'Bulgarian - български', 'Catalan - català', 'Central Kurdish - کوردی (دەستنوسی عەرەبی)', 'Chinese - 中文', 'Chinese (Hong Kong) - 中文（香港）', 'Chinese (Simplified) - 中文（简体）', 'Chinese (Traditional) - 中文（繁體）', 'Corsican', 'Croatian - hrvatski', 'Czech - čeština', 'Danish - dansk', 'Dutch - Nederlands', 'English', 'English (Australia)', 'English (Canada)', 'English (India)', 'English (New Zealand)', 'English (South Africa)', 'English (United Kingdom)', 'English (United States)', 'Esperanto - esperanto', 'Estonian - eesti', 'Faroese - føroyskt', 'Filipino', 'Finnish - suomi', 'French - français', 'French (Canada) - français (Canada)', 'French (France) - français (France)', 'French (Switzerland) - français (Suisse)', 'Galician - galego', 'Georgian - ქართული', 'German - Deutsch', 'German (Austria) - Deutsch (Österreich)', 'German (Germany) - Deutsch (Deutschland)', 'German (Liechtenstein) - Deutsch (Liechtenstein)', 'German (Switzerland) - Deutsch (Schweiz)', 'Greek - Ελληνικά', 'Guarani', 'Gujarati - ગુજરાતી', 'Hausa', 'Hawaiian - ʻŌlelo Hawaiʻi', 'Hebrew - עברית', 'Hindi - हिन्दी', 'Hungarian - magyar', 'Icelandic - íslenska', 'Indonesian - Indonesia', 'Interlingua', 'Irish - Gaeilge', 'Italian - italiano', 'Italian (Italy) - italiano (Italia)', 'Italian (Switzerland) - italiano (Svizzera)', 'Japanese - 日本語', 'Kannada - ಕನ್ನಡ', 'Kazakh - қазақ тілі', 'Khmer - ខ្មែរ', 'Korean - 한국어', 'Kurdish - Kurdî', 'Kyrgyz - кыргызча', 'Lao - ລາວ', 'Latin', 'Latvian - latviešu', 'Lingala - lingála', 'Lithuanian - lietuvių', 'Macedonian - македонски', 'Malay - Bahasa Melayu', 'Malayalam - മലയാളം', 'Maltese - Malti', 'Marathi - मराठी', 'Mongolian - монгол', 'Nepali - नेपाली', 'Norwegian - norsk', 'Norwegian Bokmål - norsk bokmål', 'Norwegian Nynorsk - nynorsk', 'Occitan', 'Oriya - ଓଡ଼ିଆ', 'Oromo - Oromoo', 'Pashto - پښتو', 'Persian - فارسی', 'Polish - polski', 'Portuguese - português', 'Portuguese (Brazil) - português (Brasil)', 'Portuguese (Portugal) - português (Portugal)', 'Punjabi - ਪੰਜਾਬੀ', 'Quechua', 'Romanian - română', 'Romanian (Moldova) - română (Moldova)', 'Romansh - rumantsch', 'Russian - русский', 'Scottish Gaelic', 'Serbian - српски', 'Serbo-Croatian - Srpskohrvatski', 'Shona - chiShona', 'Sindhi', 'Sinhala - සිංහල', 'Slovak - slovenčina', 'Slovenian - slovenščina', 'Somali - Soomaali', 'Southern Sotho', 'Spanish - español', 'Spanish (Argentina) - español (Argentina)', 'Spanish (Latin America) - español (Latinoamérica)', 'Spanish (Mexico) - español (México)', 'Spanish (Spain) - español (España)', 'Spanish (United States) - español (Estados Unidos)', 'Sundanese', 'Swahili - Kiswahili', 'Swedish - svenska', 'Tajik - тоҷикӣ', 'Tamil - தமிழ்', 'Tatar', 'Telugu - తెలుగు', 'Thai - ไทย', 'Tigrinya - ትግርኛ', 'Tongan - lea fakatonga', 'Turkish - Türkçe', 'Turkmen', 'Twi', 'Ukrainian - українська', 'Urdu - اردو', 'Uyghur', 'Uzbek - o‘zbek', 'Vietnamese - Tiếng Việt', 'Walloon - wa', 'Welsh - Cymraeg', 'Western Frisian', 'Xhosa', 'Yiddish', 'Yoruba - Èdè Yorùbá', 'Zulu - isiZulu']
        }
    },
    methods: {
        onSubmit(values) {
            if (!this.phoneValid && this.phoneNumber.length > 0)
                return
            console.log({ ...values, phoneNumber: this.phoneNumber })
        },
        onBlur() {
            if (this.phoneNumber.length === 0) {
                this.showPhoneError = false
                return
            }
            this.showPhoneError = !this.phoneValid
        },
        onValidate(phoneObj) {
            this.phoneValid = phoneObj.valid ?? false
        },
        validateEmail(value) {
            if (!value) return 'This field is required'
            const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
            if (!regex.test(value)) {
                return 'This field must be a valid email'
            }
            return true
        },
        isRequired(value) {
            if (value && value.trim()) {
                return true;
            }
            return 'This field is required';
        },
        onPasswordReset(values) {
            console.log(values)
        }
    }
}
</script>

<style scoped>
.row {
    display: flex;
}

.col:nth-child(1) {
    width: 30%;
}

.col:nth-child(2) {
    width: 70%;
}

.user-avatar-wrapper {
    max-width: 150px;
    max-height: 150px;
    margin: 0 auto 30px;
}

.user-avatar {
    display: block;
    width: 100%;
    height: 100%;
    border: 50%;
}

.user-password {
    margin-top: 15px;
}

.user-form {
    margin-left: 15px;
    height: 100%;
}

.card {
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.2);
    background-color: #fff;
}

.btn {
    background: #674188;
    color: #fff;
    font-family: Trebuchet MS;
    font-size: 12px;
    font-weight: 800;
    font-style: normal;
    text-decoration: none;
    padding: 8px;
    border: 1px solid #674188;
    border-radius: 7px;
}

.btn:hover {
    color: #674188;
    background-color: #fff;
}

.btn-delete {
    margin-left: 10px;
}


.btn-clear {
    margin-left: 10px;
}

.user-page__buttons {
    width: fit-content;
    margin: 0 auto;
}

.control {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.control:focus {
    outline: solid;
    outline-color: #674188;
    outline-width: 2px;
}

.error {
    color: red;
}


@media screen and (max-width:930px) {
    .row {
        display: block;
    }

    .col {
        width: 100% !important;
    }

    .user-form {
        margin-left: 0;
        margin-top: 15px;
    }

}
</style>