const styles = {
    animation: 'rotate 2s linear infinite',
    width:'75px',
    height:'75px'
}

export default function Loader() {
    return (
        <>
            <style>
                {`
                  @keyframes rotate {
                    0%{
                        transform: rotate(0deg);
                      }
                    100%{
                        transform: rotate(360deg);
                      }
                    }
              `}
            </style>
            <div className="flex items-center justify-center h-full">
                <img src='/images/pokeball.png' className='' style={styles} />
            </div>
        </>
    )
}
