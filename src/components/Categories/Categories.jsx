import { useState } from 'react';
import styles from './Categories.module.css'

const Categories = ({ categories, addCategory }) => {
    const [categoryName, setCategoryName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        addCategory(categoryName);
        setCategoryName('');
    }

    return <div>
        <h2 className={styles.title}>Categories</h2>
        <form onSubmit={handleSubmit} className={styles.categoriesForm}>
            <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter category name"
                className={styles.input}
            />
            <button type="submit" className={styles.categoriesBtn}>Add Category</button>
        </form>
    </div>;
}

export default Categories;