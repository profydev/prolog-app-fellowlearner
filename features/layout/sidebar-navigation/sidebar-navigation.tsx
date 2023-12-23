import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Routes } from "@config/routes";
import classNames from "classnames";
import { NavigationContext } from "./navigation-context";
import { MenuItemButton } from "./menu-item-button";
import { MenuItemLink } from "./menu-item-link";
import { Button } from "@features/ui";
import styles from "./sidebar-navigation.module.scss";

const menuItems = [
  { text: "Projects", iconSrc: "/icons/projects.svg", href: Routes.projects },
  { text: "Issues", iconSrc: "/icons/issues.svg", href: Routes.issues },
  { text: "Alerts", iconSrc: "/icons/alert.svg", href: Routes.alerts },
  { text: "Users", iconSrc: "/icons/users.svg", href: Routes.users },
  { text: "Settings", iconSrc: "/icons/settings.svg", href: Routes.settings },
];

export function SidebarNavigation() {
  const router = useRouter();
  const { isSidebarCollapsed, toggleSidebar } = useContext(NavigationContext);
  let hideCollapseButton = false;

  const isViewMobile = () => {
    if (typeof window !== "undefined") {
      const windowWidth = window.matchMedia("(min-width: 1024px)");
      if (!windowWidth.matches) {
        hideCollapseButton = true;
        return "/icons/logo-large.svg";
      } else if (windowWidth.matches) {
        if (isSidebarCollapsed) {
          return "/icons/logo-small.svg";
        } else {
          return "/icons/logo-large.svg";
        }
      }
    }
  };

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleEmailClick = () => {
    const email = "support@prolog-app.com";
    const subject = "Support Request:";
    //const body = 'How can we help?';

    if (typeof window !== "undefined") {
      const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
        subject,
      )}`;

      // Open the user's default email client
      window.location.href = mailtoLink;
    }
  };
  return (
    <div
      className={classNames(
        styles.container,
        isSidebarCollapsed && styles.isCollapsed,
      )}
    >
      <div
        className={classNames(
          styles.fixedContainer,
          isSidebarCollapsed && styles.isCollapsed,
        )}
      >
        <header className={styles.header}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={isViewMobile()} alt="logo" className={styles.logo} />
          <Button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className={styles.menuButton}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={isMobileMenuOpen ? "/icons/close.svg" : "/icons/menu.svg"}
              alt={isMobileMenuOpen ? "close menu" : "open menu"}
              className={styles.menuIcon}
            />
          </Button>
        </header>
        <div
          className={classNames(
            styles.menuOverlay,
            isMobileMenuOpen && styles.isMobileMenuOpen,
          )}
        />
        <nav
          className={classNames(
            styles.nav,
            isMobileMenuOpen && styles.isMobileMenuOpen,
          )}
        >
          <ul className={styles.linkList}>
            {menuItems.map((menuItem, index) => (
              <MenuItemLink
                key={index}
                {...menuItem}
                isCollapsed={isSidebarCollapsed}
                isActive={router.pathname === menuItem.href}
              />
            ))}
          </ul>
          <ul className={styles.list}>
            <MenuItemButton
              text="Support"
              iconSrc="/icons/support.svg"
              isCollapsed={isSidebarCollapsed}
              onClick={() => handleEmailClick()}
            />
            <MenuItemButton
              text="Collapse"
              iconSrc="/icons/arrow-left.svg"
              isCollapsed={isSidebarCollapsed}
              onClick={() => toggleSidebar()}
              className={`${isSidebarCollapsed && styles.rotatedMenuIcon} ${
                hideCollapseButton && styles.collapseMenuItem
              }`}
            />
          </ul>
        </nav>
      </div>
    </div>
  );
}
