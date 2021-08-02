import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import * as auth from '../_redux/authRedux'
import { login } from '../_redux/authCrud'
import { API_URL } from '../../../config'

/*
  INTL (i18n) docs:
  https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage
*/

/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/

const initialValues = {
  email: 'admin@aalacart.com',
  password: 'admin@aalacart.com',
}

function Login(props) {
  const { intl } = props
  const [loading, setLoading] = useState(false)
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Wrong email format')
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required(
        intl.formatMessage({
          id: 'AUTH.VALIDATION.REQUIRED_FIELD',
        }),
      ),
    password: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required(
        intl.formatMessage({
          id: 'AUTH.VALIDATION.REQUIRED_FIELD',
        }),
      ),
  })

  const enableLoading = () => {
    setLoading(true)
  }

  const disableLoading = () => {
    setLoading(false)
  }

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return 'is-invalid'
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return 'is-valid'
    }

    return ''
  }

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading()
      // alert('in')

      // login(values.email, values.password)
      //   .then(({ data: { authToken } }) => {
      //     disableLoading()

      //     props.login(authToken)
      //   })
      //   .catch(() => {
      //     setStatus(
      //       intl.formatMessage({
      //         id: 'AUTH.VALIDATION.INVALID_LOGIN',
      //       }),
      //     )
      //   })
      //   .finally(() => {
      //     disableLoading()
      //     setSubmitting(false)
      //   })

      fetch(`${API_URL}login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.email,
          password: values.password,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          // console.log(res)
          if (res.status) {
            props.login(res.data)
          } else {
            setSubmitting(false)
            disableLoading()
            setStatus(res.message)
          }
        })
        .catch((err) => {
          setSubmitting(false)
          setStatus(
            intl.formatMessage({
              id: 'AUTH.VALIDATION.INVALID_LOGIN',
            }),
          )
        })

      // setTimeout(() => {

      // }, 1000);
    },
  })

  return (
    <>
      <div className="login-content flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto">
        {/*begin::Content body*/}
        <div className="d-flex flex-column-fluid flex-center">
          {/*begin::Signin*/}
          <div className="login-form login-signin">
            {/*begin::Form*/}
            <form
              // onSubmit={formik.handleSubmit}
              className="form fv-plugins-bootstrap fv-plugins-framework"
              // noValidate="novalidate"
              id="kt_login_signin_form"
            >
              {/*begin::Title*/}
              <div className="pb-13 pt-lg-0 pt-5">
                <h3 className="font-weight-bolder text-dark font-size-h4 font-size-h1-lg">
                  Welcome to Aalacart
                </h3>
                <span className="text-muted font-weight-bold font-size-h4">
                  New Here?
                  <a
                    href="javascript:;"
                    id="kt_login_signup"
                    className="text-primary font-weight-bolder"
                  >
                    Create an Account
                  </a>
                </span>
              </div>
              {formik.status && (
                <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
                  <div className="alert-text font-weight-bold">
                    {formik.status}
                  </div>
                </div>
              )}
              {/*begin::Title*/}
              {/*begin::Form group*/}
              <div className="form-group">
                <label className="font-size-h6 font-weight-bolder text-dark">
                  Email
                </label>
                {/* <input
                  className="form-control  h-auto py-6 px-6 rounded-lg"
                  type="text"
                  placeholder="Username"
                  name="username"
                  autoComplete="off"
                /> */}
                <input
                  placeholder="Email"
                  type="email"
                  className={`form-control  h-auto py-6 px-6 ${getInputClasses(
                    'email',
                  )}`}
                  name="email"
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">{formik.errors.email}</div>
                  </div>
                ) : null}
              </div>
              {/*end::Form group*/}
              {/*begin::Form group*/}
              <div className="form-group">
                <div className="d-flex justify-content-between mt-n5">
                  <label className="font-size-h6 font-weight-bolder text-dark pt-5">
                    Password
                  </label>
                  <a
                    href="javascript:;"
                    className="text-primary font-size-h6 font-weight-bolder text-hover-primary pt-5"
                    id="kt_login_forgot"
                  >
                    Forgot Password ?
                  </a>
                </div>
                <input
                  placeholder="Password"
                  type="password"
                  className={`form-control  h-auto py-6 px-6 ${getInputClasses(
                    'password',
                  )}`}
                  name="password"
                  {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      {formik.errors.password}
                    </div>
                  </div>
                ) : null}
              </div>
              {/*end::Form group*/}
              {/*begin::Action*/}
              <div className="pb-lg-0 pb-5">
                <button
                  // id="kt_login_signin_submit"
                  type="submit"
                  onClick={formik.handleSubmit}
                  disabled={formik.isSubmitting}
                  className={`btn btn-primary font-weight-bold px-9 py-4 my-3 mr-3`}
                >
                  <span>Sign In</span>
                  {loading && (
                    <span className="ml-3 spinner spinner-white"></span>
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-light-primary font-weight-bolder px-8 py-4 my-3 font-size-lg"
                >
                  <span className="svg-icon svg-icon-md">
                    {/*begin::Svg Icon | path:assets/media/svg/social-icons/google.svg*/}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M19.9895 10.1871C19.9895 9.36767 19.9214 8.76973 19.7742 8.14966H10.1992V11.848H15.8195C15.7062 12.7671 15.0943 14.1512 13.7346 15.0813L13.7155 15.2051L16.7429 17.4969L16.9527 17.5174C18.879 15.7789 19.9895 13.221 19.9895 10.1871Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M10.1993 19.9313C12.9527 19.9313 15.2643 19.0454 16.9527 17.5174L13.7346 15.0813C12.8734 15.6682 11.7176 16.0779 10.1993 16.0779C7.50243 16.0779 5.21352 14.3395 4.39759 11.9366L4.27799 11.9466L1.13003 14.3273L1.08887 14.4391C2.76588 17.6945 6.21061 19.9313 10.1993 19.9313Z"
                        fill="#34A853"
                      />
                      <path
                        d="M4.39748 11.9366C4.18219 11.3166 4.05759 10.6521 4.05759 9.96565C4.05759 9.27909 4.18219 8.61473 4.38615 7.99466L4.38045 7.8626L1.19304 5.44366L1.08875 5.49214C0.397576 6.84305 0.000976562 8.36008 0.000976562 9.96565C0.000976562 11.5712 0.397576 13.0882 1.08875 14.4391L4.39748 11.9366Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M10.1993 3.85336C12.1142 3.85336 13.406 4.66168 14.1425 5.33717L17.0207 2.59107C15.253 0.985496 12.9527 0 10.1993 0C6.2106 0 2.76588 2.23672 1.08887 5.49214L4.38626 7.99466C5.21352 5.59183 7.50242 3.85336 10.1993 3.85336Z"
                        fill="#EB4335"
                      />
                    </svg>
                    {/*end::Svg Icon*/}
                  </span>
                  Sign in with Google
                </button>
              </div>
              {/*end::Action*/}
            </form>
            {/*end::Form*/}
          </div>
          {/*end::Signin*/}
          {/*begin::Signup*/}
          <div className="login-form login-signup">
            {/*begin::Form*/}
            <form
              className="form"
              noValidate="novalidate"
              id="kt_login_signup_form"
            >
              {/*begin::Title*/}
              <div className="pb-13 pt-lg-0 pt-5">
                <h3 className="font-weight-bolder text-dark font-size-h4 font-size-h1-lg">
                  Sign Up
                </h3>
                <p className="text-muted font-weight-bold font-size-h4">
                  Enter your details to create your account
                </p>
              </div>
              {/*end::Title*/}
              {/*begin::Form group*/}
              <div className="form-group">
                <input
                  className="form-control  h-auto py-6 px-6 rounded-lg font-size-h6"
                  type="text"
                  placeholder="Fullname"
                  name="fullname"
                  autoComplete="off"
                />
              </div>
              {/*end::Form group*/}
              {/*begin::Form group*/}
              <div className="form-group">
                <input
                  className="form-control  h-auto py-6 px-6 rounded-lg font-size-h6"
                  type="email"
                  placeholder="Email"
                  name="email"
                  autoComplete="off"
                />
              </div>
              {/*end::Form group*/}
              {/*begin::Form group*/}
              <div className="form-group">
                <input
                  className="form-control  h-auto py-6 px-6 rounded-lg font-size-h6"
                  type="password"
                  placeholder="Password"
                  name="password"
                  autoComplete="off"
                />
              </div>
              {/*end::Form group*/}
              {/*begin::Form group*/}
              <div className="form-group">
                <input
                  className="form-control  h-auto py-6 px-6 rounded-lg font-size-h6"
                  type="password"
                  placeholder="Confirm password"
                  name="cpassword"
                  autoComplete="off"
                />
              </div>
              {/*end::Form group*/}
              {/*begin::Form group*/}
              <div className="form-group">
                <label className="checkbox mb-0">
                  <input type="checkbox" name="agree" />
                  <span />
                  <div className="ml-2">
                    I Agree the
                    <a href="#">terms and conditions</a>.
                  </div>
                </label>
              </div>
              {/*end::Form group*/}
              {/*begin::Form group*/}
              <div className="form-group d-flex flex-wrap pb-lg-0 pb-3">
                <button
                  type="button"
                  id="kt_login_signup_submit"
                  className="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-4"
                >
                  Submit
                </button>
                <button
                  type="button"
                  id="kt_login_signup_cancel"
                  className="btn btn-light-primary font-weight-bolder font-size-h6 px-8 py-4 my-3"
                >
                  Cancel
                </button>
              </div>
              {/*end::Form group*/}
            </form>
            {/*end::Form*/}
          </div>
          {/*end::Signup*/}
          {/*begin::Forgot*/}
          <div className="login-form login-forgot">
            {/*begin::Form*/}
            <form
              className="form"
              noValidate="novalidate"
              id="kt_login_forgot_form"
            >
              {/*begin::Title*/}
              <div className="pb-13 pt-lg-0 pt-5">
                <h3 className="font-weight-bolder text-dark font-size-h4 font-size-h1-lg">
                  Forgotten Password ?
                </h3>
                <p className="text-muted font-weight-bold font-size-h4">
                  Enter your email to reset your password
                </p>
              </div>
              {/*end::Title*/}
              {/*begin::Form group*/}
              <div className="form-group">
                <input
                  className="form-control  h-auto py-6 px-6 rounded-lg font-size-h6"
                  type="email"
                  placeholder="Email"
                  name="email"
                  autoComplete="off"
                />
              </div>
              {/*end::Form group*/}
              {/*begin::Form group*/}
              <div className="form-group d-flex flex-wrap pb-lg-0">
                <button
                  type="button"
                  id="kt_login_forgot_submit"
                  className="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-4"
                >
                  Submit
                </button>
                <button
                  type="button"
                  id="kt_login_forgot_cancel"
                  className="btn btn-light-primary font-weight-bolder font-size-h6 px-8 py-4 my-3"
                >
                  Cancel
                </button>
              </div>
              {/*end::Form group*/}
            </form>
            {/*end::Form*/}
          </div>
          {/*end::Forgot*/}
        </div>
        {/*end::Content body*/}
        {/*begin::Content footer*/}
        <div className="d-flex justify-content-lg-start justify-content-center align-items-end py-7 py-lg-0">
          <div className="text-dark-50 font-size-lg font-weight-bolder mr-10">
            <span className="mr-1">2021©</span>
            <a
              href="http://keenthemes.com/metronic"
              target="_blank"
              className="text-dark-75 text-hover-primary"
            >
              Aalacart
            </a>
          </div>
        </div>
        {/*end::Content footer*/}
      </div>
    </>
  )
}

export default injectIntl(connect(null, auth.actions)(Login))
