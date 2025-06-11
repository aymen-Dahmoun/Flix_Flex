

export default function Modal({ visible, onDismiss, children }) {
    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onDismiss}
                contentContainerStyle={{
                    backgroundColor: 'white',
                    padding: 20,
                    margin: 20,
                    borderRadius: 10,
                    elevation: 5,
                }}
            >
                {children}
            </Modal>
        </Portal>
    );
}