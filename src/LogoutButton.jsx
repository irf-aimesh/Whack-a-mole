import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <button
      onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
      style={{
        padding: '12px 30px',
        fontSize: '1.1rem',
        background: '#e74c3c',
        color: 'white',
        border: 'none',
        borderRadius: '50px',
        cursor: 'pointer',
        margin: '10px',
        fontWeight: 'bold',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        transition: 'all 0.3s'
      }}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
