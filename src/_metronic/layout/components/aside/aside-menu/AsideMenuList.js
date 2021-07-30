/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react'
import { useLocation } from 'react-router'
import { NavLink } from 'react-router-dom'
import SVG from 'react-inlinesvg'
import { toAbsoluteUrl, checkIsActive } from '../../../../_helpers'

export function AsideMenuList({ layoutProps }) {
  const location = useLocation()
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${
          !hasSubmenu && 'menu-item-active'
        } menu-item-open menu-item-not-hightlighted`
      : ''
  }

  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        {/* <li
          className={`menu-item ${getMenuItemActive('/dashboard', false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl('/media/svg/icons/Design/Layers.svg')} />
            </span>
            <span className="menu-text">Dashboard</span>
          </NavLink>
        </li> */}
        {/*end::1 Level*/}

        {/* Components */}
        {/* begin::section */}
        <li className="menu-section ">
          <h4 className="menu-text">Admin</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>
        <li
          className={`menu-item ${getMenuItemActive('/dashboard', false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl('/media/svg/icons/Devices/TV1.svg')} />
            </span>
            <span className="menu-text">Dashboard</span>
          </NavLink>
        </li>
        <li
          className={`menu-item ${getMenuItemActive('/users', false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/users">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl('/media/svg/icons/General/User.svg')} />
            </span>
            <span className="menu-text">Manage User</span>
          </NavLink>
        </li>
        <li
          className={`menu-item ${getMenuItemActive('/manage-server', false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/manage-server">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl('/media/svg/icons/Devices/Server.svg')} />
            </span>
            <span className="menu-text">Manage Server</span>
          </NavLink>
        </li>
        <li
          className={`menu-item ${getMenuItemActive('/manage-rds', false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/manage-rds">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl('/media/svg/icons/Design/Layers.svg')} />
            </span>
            <span className="menu-text">Manage RDS</span>
          </NavLink>
        </li>
        <li
          className={`menu-item ${getMenuItemActive('/plans-coupon', false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/plans-coupon">
            <span className="svg-icon menu-icon">
              <SVG
                src={toAbsoluteUrl('/media/svg/icons/Shopping/Wallet.svg')}
              />
            </span>
            <span className="menu-text">Plans & Coupons</span>
          </NavLink>
        </li>
        <li
          className={`menu-item ${getMenuItemActive('/data-scheduler', false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/data-scheduler">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl('/media/svg/icons/Tools/Tools.svg')} />
            </span>
            <span className="menu-text">Data Scheduler</span>
          </NavLink>
        </li>

        <li className="menu-section ">
          <h4 className="menu-text">USER</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>

        <li
          className={`menu-item ${getMenuItemActive('/dashboard-user', false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl('/media/svg/icons/Devices/TV1.svg')} />
            </span>
            <span className="menu-text">Dashboard</span>
          </NavLink>
        </li>

        {/*begin::1 Level*/}
        <li
          className={`menu-item menu-item-submenu ${getMenuItemActive(
            '/google-material',
            true,
          )}`}
          aria-haspopup="true"
          data-menu-toggle="hover"
        >
          <NavLink className="menu-link menu-toggle" to="/google-material">
            <span className="svg-icon menu-icon">
              <SVG
                src={toAbsoluteUrl('/media/svg/icons/Shopping/Chart-pie.svg')}
              />
            </span>
            <span className="menu-text">Analytics</span>
            <i className="menu-arrow" />
          </NavLink>
          <div className="menu-submenu ">
            <i className="menu-arrow" />
            <ul className="menu-subnav">
              <li className="menu-item  menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">Analytics</span>
                </span>
              </li>
              <li
                className={`menu-item menu-item-submenu ${getMenuItemActive(
                  '/fi',
                  true,
                )}`}
                aria-haspopup="true"
                data-menu-toggle="hover"
              >
                <NavLink className="menu-link menu-toggle" to="/coming">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Financial Analytics</span>
                </NavLink>
              </li>
              <li
                className={`menu-item menu-item-submenu ${getMenuItemActive(
                  '/ad',
                  true,
                )}`}
                aria-haspopup="true"
                data-menu-toggle="hover"
              >
                <NavLink className="menu-link menu-toggle" to="/coming">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Advertising Analytics</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </li>
        <li
          className={`menu-item menu-item-submenu ${getMenuItemActive(
            '/h',
            true,
          )}`}
          aria-haspopup="true"
          data-menu-toggle="hover"
        >
          <NavLink className="menu-link menu-toggle" to="/google-material">
            <span className="svg-icon menu-icon">
              <SVG
                src={toAbsoluteUrl(
                  '/media/svg/icons/Layout/Layout-4-blocks.svg',
                )}
              />
            </span>
            <span className="menu-text">Mapping</span>
            <i className="menu-arrow" />
          </NavLink>
          <div className="menu-submenu ">
            <i className="menu-arrow" />
            <ul className="menu-subnav">
              <li className="menu-item  menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">Mapping</span>
                </span>
              </li>
              <li
                className={`menu-item menu-item-submenu ${getMenuItemActive(
                  '/fi',
                  true,
                )}`}
                aria-haspopup="true"
                data-menu-toggle="hover"
              >
                <NavLink className="menu-link menu-toggle" to="/coming">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">COGS Mapping</span>
                </NavLink>
              </li>
              <li
                className={`menu-item menu-item-submenu ${getMenuItemActive(
                  '/ad',
                  true,
                )}`}
                aria-haspopup="true"
                data-menu-toggle="hover"
              >
                <NavLink className="menu-link menu-toggle" to="/coming">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Campaign Mapping</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </li>

        <li
          className={`menu-item menu-item-submenu ${getMenuItemActive(
            '/h',
            true,
          )}`}
          aria-haspopup="true"
          data-menu-toggle="hover"
        >
          <NavLink className="menu-link menu-toggle" to="/google-material">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl('/media/svg/icons/Files/File.svg')} />
            </span>
            <span className="menu-text">Reports</span>
            <i className="menu-arrow" />
          </NavLink>
          <div className="menu-submenu ">
            <i className="menu-arrow" />
            <ul className="menu-subnav">
              {/* <li className="menu-item  menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">Mapping</span>
                </span>
              </li> */}
              <li
                className={`menu-item menu-item-submenu ${getMenuItemActive(
                  '/fi',
                  true,
                )}`}
                aria-haspopup="true"
                data-menu-toggle="hover"
              >
                <NavLink className="menu-link menu-toggle" to="/coming">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Amazon SP API Reports</span>
                </NavLink>
              </li>
              <li
                className={`menu-item menu-item-submenu ${getMenuItemActive(
                  '/ad',
                  true,
                )}`}
                aria-haspopup="true"
                data-menu-toggle="hover"
              >
                <NavLink className="menu-link menu-toggle" to="/coming">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Amazon Advertising reports</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </li>

        <li
          className={`menu-item menu-item-submenu ${getMenuItemActive(
            '/google-material',
            true,
          )}`}
          aria-haspopup="true"
          data-menu-toggle="hover"
        >
          <NavLink className="menu-link menu-toggle" to="/google-material">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl('/media/svg/icons/Code/Settings4.svg')} />
            </span>
            <span className="menu-text">Settings</span>
            <i className="menu-arrow" />
          </NavLink>
          <div className="menu-submenu ">
            <i className="menu-arrow" />
            <ul className="menu-subnav">
              <li className="menu-item  menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">Settings</span>
                </span>
              </li>

              {/* Profile */}
              {/*begin::2 Level*/}
              <li
                className={`menu-item menu-item-submenu ${getMenuItemActive(
                  '/google-material/layout',
                  true,
                )}`}
                aria-haspopup="true"
                data-menu-toggle="hover"
              >
                <NavLink
                  className="menu-link menu-toggle"
                  to="/google-material/layout"
                >
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Profile Settings</span>
                  <i className="menu-arrow" />
                </NavLink>
                <div className="menu-submenu">
                  <i className="menu-arrow" />
                  <ul className="menu-subnav">
                    {/*begin::3 Level*/}
                    <li
                      className={`menu-item ${getMenuItemActive('/coming')}`}
                      aria-haspopup="true"
                    >
                      <NavLink className="menu-link" to="/coming">
                        <i className="menu-bullet menu-bullet-dot">
                          <span />
                        </i>
                        <span className="menu-text">Profile</span>
                      </NavLink>
                    </li>
                    {/*end::3 Level*/}

                    {/*begin::3 Level*/}
                    <li
                      className={`menu-item ${getMenuItemActive('/coming')}`}
                      aria-haspopup="true"
                    >
                      <NavLink className="menu-link" to="/coming">
                        <i className="menu-bullet menu-bullet-dot">
                          <span />
                        </i>
                        <span className="menu-text">Billing Details</span>
                      </NavLink>
                    </li>
                    {/*end::3 Level*/}
                  </ul>
                </div>
              </li>
              {/*end::2 Level*/}

              {/* Marketplace Credentials */}
              {/*begin::2 Level*/}
              <li
                className={`menu-item menu-item-submenu ${getMenuItemActive(
                  '/coming',
                  true,
                )}`}
                aria-haspopup="true"
                data-menu-toggle="hover"
              >
                <NavLink className="menu-link menu-toggle" to="/coming">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Marketplace Credentials</span>
                  <i className="menu-arrow" />
                </NavLink>
                <div className="menu-submenu">
                  <i className="menu-arrow" />
                  <ul className="menu-subnav">
                    {/*begin::3 Level*/}
                    <li
                      className={`menu-item ${getMenuItemActive('/coming')}`}
                      aria-haspopup="true"
                    >
                      <NavLink className="menu-link" to="/coming">
                        <i className="menu-bullet menu-bullet-dot">
                          <span />
                        </i>
                        <span className="menu-text">Amazon SP API Cred.</span>
                      </NavLink>
                    </li>
                    {/*end::3 Level*/}

                    {/*begin::3 Level*/}
                    <li
                      className={`menu-item ${getMenuItemActive('/coming')}`}
                      aria-haspopup="true"
                    >
                      <NavLink className="menu-link" to="/coming">
                        <i className="menu-bullet menu-bullet-dot">
                          <span />
                        </i>
                        <span className="menu-text">Amazon Adv. API Cred.</span>
                      </NavLink>
                    </li>
                    {/*end::3 Level*/}

                    {/*begin::3 Level*/}
                    <li
                      className={`menu-item ${getMenuItemActive('/coming')}`}
                      aria-haspopup="true"
                    >
                      <NavLink className="menu-link" to="/coming">
                        <i className="menu-bullet menu-bullet-dot">
                          <span />
                        </i>
                        <span className="menu-text">eBay Credentials</span>
                      </NavLink>
                    </li>
                    {/*end::3 Level*/}

                    {/*begin::3 Level*/}
                    <li
                      className={`menu-item ${getMenuItemActive('/coming')}`}
                      aria-haspopup="true"
                    >
                      <NavLink className="menu-link" to="/coming">
                        <i className="menu-bullet menu-bullet-dot">
                          <span />
                        </i>
                        <span className="menu-text">Walmart Credentials</span>
                      </NavLink>
                    </li>
                    {/*end::3 Level*/}

                    {/*begin::3 Level*/}
                    <li
                      className={`menu-item ${getMenuItemActive('/coming')}`}
                      aria-haspopup="true"
                    >
                      <NavLink className="menu-link" to="/coming">
                        <i className="menu-bullet menu-bullet-dot">
                          <span />
                        </i>
                        <span className="menu-text">Etsy Credentials</span>
                      </NavLink>
                    </li>
                    {/*end::3 Level*/}
                  </ul>
                </div>
              </li>
              {/*end::2 Level*/}
            </ul>
          </div>
        </li>
        <li
          className={`menu-item menu-item-submenu ${getMenuItemActive(
            '/h',
            true,
          )}`}
          aria-haspopup="true"
          data-menu-toggle="hover"
        >
          <NavLink className="menu-link menu-toggle" to="/google-material">
            <span className="svg-icon menu-icon">
              <SVG
                src={toAbsoluteUrl('/media/svg/icons/Shopping/Chart-bar1.svg')}
              />
            </span>
            <span className="menu-text">Application Logs</span>
            <i className="menu-arrow" />
          </NavLink>
          <div className="menu-submenu ">
            <i className="menu-arrow" />
            <ul className="menu-subnav">
              {/* <li className="menu-item  menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">Mapping</span>
                </span>
              </li> */}
              <li
                className={`menu-item menu-item-submenu ${getMenuItemActive(
                  '/fi',
                  true,
                )}`}
                aria-haspopup="true"
                data-menu-toggle="hover"
              >
                <NavLink className="menu-link menu-toggle" to="/coming">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Cron Logs</span>
                </NavLink>
              </li>
              <li
                className={`menu-item menu-item-submenu ${getMenuItemActive(
                  '/ad',
                  true,
                )}`}
                aria-haspopup="true"
                data-menu-toggle="hover"
              >
                <NavLink className="menu-link menu-toggle" to="/coming">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">System Logs</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </li>
      </ul>

      {/* end::Menu Nav */}
    </>
  )
}
