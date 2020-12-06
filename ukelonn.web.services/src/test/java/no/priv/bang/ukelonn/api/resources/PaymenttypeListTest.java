/*
 * Copyright 2018-2020 Steinar Bang
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations
 * under the License.
 */
package no.priv.bang.ukelonn.api.resources;

import static no.priv.bang.ukelonn.testutils.TestUtils.*;
import static org.junit.Assert.*;
import static org.mockito.Mockito.*;
import java.util.List;

import org.junit.Test;

import no.priv.bang.ukelonn.UkelonnService;
import no.priv.bang.ukelonn.api.ServletTestBase;
import no.priv.bang.ukelonn.beans.TransactionType;

public class PaymenttypeListTest extends ServletTestBase {

    public PaymenttypeListTest() {
        super("/ukelonn", "/api");
    }

    @Test
    public void testGetPaymenttypes() throws Exception {
        // Create the resource that is to be tested
        PaymenttypeList resource = new PaymenttypeList();

        // Inject fake OSGi service UkelonnService
        UkelonnService ukelonn = mock(UkelonnService.class);
        when(ukelonn.getPaymenttypes()).thenReturn(getPaymenttypes());
        resource.ukelonn = ukelonn;

        // Run the method that is to be tested
        List<TransactionType> paymenttypes = resource.getPaymenttypes();

        // Check the output
        assertEquals(2, paymenttypes.size());
    }

}
