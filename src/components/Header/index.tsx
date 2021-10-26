import styles from './styles.module.scss'

import { SignInButton } from './SingInButton'

export function Header() {
    return(
       <header className={styles.headerContainer}>
           <div className={styles.headerContent}>
               <img src="/images/logo.svg" alt="ig.news"></img>
               <nav>
                   <a className={styles.active}>Home</a>
                   <a>Posts</a>
               </nav>

               <SignInButton />
           </div>
       </header> 
    )
}