package com.example.FullStack;

import static org.assertj.core.api.Assertions.assertThat;

import com.example.FullStack.users.User;
import com.example.FullStack.users.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.annotation.Rollback;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(false)
public class UserRepositoryTests {

    @Autowired
    private UserRepository repo;

    @Autowired
    private TestEntityManager entityManager;

    @Test
    public void testCreateUser(){
        User user = new User();
        user.setGamerTag("West Bay2");
        user.setPassword("p@ssw0rd!!");
        user.setUsername("jnkziaa192");

        User savedUser = repo.save(user);

        User existUser = entityManager.find(User.class, savedUser.getId());

        assertThat(existUser.getGamerTag()).isEqualTo(user.getGamerTag());
    }

    @Test
    public void testFindUserByUsername(){
        String username = "jnkziaa192";
        User user = repo.findByUsername(username);

        assertThat(user).isNotNull();

    }
}
