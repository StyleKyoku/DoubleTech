import styles from "../AdminDashboard.module.scss";

const RecentUserCard = ({ user }) => {
  return (
    <tr>
      <td>
        <div className={styles["item-info"]}>
          <div className={styles["item-image-wrapper"]}>
            <img
              src={
                user.avatarUrl ||
                `${import.meta.env.BASE_URL}assets/images/profile/default-avatar.svg`
              }
              alt={`${user.name} ${user.surname}`}
              className={styles["item-image"]}
            />
          </div>
          <span className={styles["item-name"]}>
            {user.name + " " + user.surname}
          </span>
        </div>
      </td>
      <td>{user.email}</td>
      <td>reg date</td>
      <td>
        <button className={styles["item-edit-button"]}>Edit</button>
      </td>
    </tr>
  );
};

export default RecentUserCard;
